from io import BytesIO
from typing import Callable, List
from uuid import UUID

from django.conf import settings
from django.http import FileResponse, HttpRequest
from django.utils.timezone import now
from loguru import logger
from ninja import Body, Query
from ninja.pagination import LimitOffsetPagination, paginate

from api.internal.auth.domain.socials.entities import GoogleCredentialsIn, TelegramCredentialsIn, VKCredentialsIn
from api.internal.auth.domain.socials.services import GoogleAuth, SocialAuthStatus, SocialBase, TelegramAuth, VKAuth
from api.internal.base import HandlersMetaclass
from api.internal.db.models import User
from api.internal.db.models.user import Permissions
from api.internal.db.repositories import google_repo, telegram_repo, vk_repo
from api.internal.exceptions import (
    BadRequestException,
    NotFoundException,
    ServerException,
    UnprocessableEntityException,
)
from api.internal.logging import log
from api.internal.responses import SuccessResponse
from api.internal.users.domain.entities import (
    CurrentProfileIn,
    Filters,
    FormValueOut,
    FullProfileOut,
    MergingIn,
    ProfileIn,
    ProfileOut,
)
from api.internal.users.domain.services import MergingService, UserSerializer, UserService

STARTING = "Starting"
PROCESSING = "Processing"
OPERATION_IS_OVER = "Operation is over"

OPERATION_IS_OVER__UPDATING_SELF = f"{OPERATION_IS_OVER} (updating self)"
OPERATION_IS_OVER__CANNOT_UPDATE_PERMISSION = f"{OPERATION_IS_OVER} (cannot update permission)"
OPERATION_IS_OVER__CANNOT_UPDATE_EMAIL = f"{OPERATION_IS_OVER} (cannot update email)"
OPERATION_IS_OVER__NOT_EQUAL_PERMISSIONS = f"{OPERATION_IS_OVER} (not equal permissions)"
OPERATION_IS_OVER__EXISTS_INTERSECTION_OF_REQUESTS = f"{OPERATION_IS_OVER} (exists intersection of requests)"
OPERATION_IS_OVER__EXISTS_INTERSECTION_OF_PARTICIPATION = f"{OPERATION_IS_OVER} (exists intersection of participation)"
OPERATION_IS_OVER__COMPETITION_ADMIN = f"{OPERATION_IS_OVER} (user is competition admin)"
OPERATION_IS_OVER__PERMISSIONS_COMPARISON = f"{OPERATION_IS_OVER} (permissions comparison)"


class UserHandlers(metaclass=HandlersMetaclass):
    INTERSECTION_REQUESTS = "Exists intersection of requests"
    INTERSECTION_PARTICIPANTS = "Exists intersection of participants"
    NOT_EQUAL_PERMISSIONS = "Permissions must be equal"
    EMAIL_ALREADY_EXISTS = "The email already exists"
    UPDATING_SELF_IS_NOT_ALLOWED = "Updating self is not allowed"
    PERMISSION_CANNOT_BE_UPDATED = "The permission cannot be updated"
    MERGING_SELF_IS_NOT_ALLOWED = "Merging self is not allowed"
    SOME_COMPETITION_HAS_THIS_ADMIN = "Some competition has this admin"
    PERMISSION_MUST_BE_LTE_THAN_UPDATER_PERMISSION = "Permission must be lte than the updater permission"

    UPDATING_SELF = "updating self"
    BAD_USERS = "bad users"
    ANY_USERS = "any users"
    BAD_PERMISSIONS = "bad permissions"
    BAD_PERMISSION = "bad permission"
    BAD_EMAIL = "bad email"
    COMPETITION_ADMIN = "competition admin"
    PERMISSIONS_COMPARISON = "permissions comparison"

    USERS = "users"
    USER = "user"
    PERMISSION = "permission"
    REQUESTS = "requests"
    PARTICIPANTS = "participants"

    def __init__(self, user_service: UserService, merging_service: MergingService, document_service: UserSerializer):
        self._user_service = user_service
        self._merging_service = merging_service
        self._user_serializer = document_service

    @paginate(LimitOffsetPagination)
    def get_users(self, request: HttpRequest, _operation_id: UUID, filters: Filters = Query(...)) -> List[ProfileOut]:
        return [ProfileOut.from_orm(user) for user in self._user_service.get_filtered(filters)]

    def get_user(self, request: HttpRequest, _operation_id: UUID, user_id: int) -> FullProfileOut:
        if not (user := self._user_service.get_user(user_id)):
            raise NotFoundException(self.USER)

        return FullProfileOut.from_orm(user)

    def update_user(
        self, request: HttpRequest, _operation_id: UUID, user_id: int, data: ProfileIn = Body(...)
    ) -> SuccessResponse:
        """
        422 error codes:\n
            "updating self" - updating self is not allowed
            "permissions comparison" - permission must be less than or equal to updater permission
            "competition admin" - some competition has admin
            "bad email" - some user has this email. 'null' value can set for all users
        """

        if not (user := self._user_service.get_user(user_id)):
            raise NotFoundException(self.USER)

        updater: User = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "updater_permission": updater.permission,
            "target_id": user.id,
            "target_permission": user.permission,
        } | data.dict()

        logger.info(log(_operation_id, STARTING, **log_kwargs))

        if updater.pk == user.pk:
            logger.success(log(_operation_id, OPERATION_IS_OVER__UPDATING_SELF))
            raise UnprocessableEntityException(self.UPDATING_SELF_IS_NOT_ALLOWED, error=self.UPDATING_SELF)

        if self._user_service.compare_permissions(Permissions(updater.permission), data.permission) > 0:
            logger.success(log(_operation_id, OPERATION_IS_OVER__PERMISSIONS_COMPARISON))
            raise UnprocessableEntityException(
                self.PERMISSION_MUST_BE_LTE_THAN_UPDATER_PERMISSION, error=self.PERMISSIONS_COMPARISON
            )

        if self._user_service.is_competition_admin(user):
            logger.success(log(_operation_id, OPERATION_IS_OVER__COMPETITION_ADMIN))
            raise UnprocessableEntityException(self.SOME_COMPETITION_HAS_THIS_ADMIN, error=self.COMPETITION_ADMIN)

        if self._user_service.have_others_email(user, data.email):
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__CANNOT_UPDATE_EMAIL,
                    email=user.email,
                    new_email=data.email,
                )
            )
            raise UnprocessableEntityException(self.EMAIL_ALREADY_EXISTS, error=self.BAD_EMAIL)

        logger.info(log(_operation_id, PROCESSING))
        self._user_service.update(user, data)

        logger.success(log(_operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def get_users_xlsx(self, request: HttpRequest, filters: Filters = Query(...)) -> FileResponse:
        return self._get_users_in_file(filters, self._user_serializer.to_xlsx, extension="xlsx")

    def get_users_csv(self, request: HttpRequest, filters: Filters = Query(...)) -> FileResponse:
        return self._get_users_in_file(filters, self._user_serializer.to_csv, extension="csv")

    def merge_users(
        self, request: HttpRequest, data: MergingIn = Body(...), _operation_id: UUID = None
    ) -> SuccessResponse:
        """
        422 error codes:\n
            "bad permissions" - permissions are not equal
            "requests" - exists intersection of requests from default user
            "participants" - exists intersection of participants in some request
        """
        if data.from_id == data.to_id:
            raise BadRequestException(self.MERGING_SELF_IS_NOT_ALLOWED)

        if not (users := self._merging_service.try_get(data)):
            raise NotFoundException(what=self.ANY_USERS)

        from_user, to_user = users.from_user, users.to_user
        log_kwargs = {
            "from_id": from_user.id,
            "from_permission": from_user.permission,
            "to_id": to_user.id,
            "to_permission": to_user.permission,
        }

        logger.info(log(_operation_id, STARTING, **log_kwargs))

        if from_user.permission != to_user.permission:
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__NOT_EQUAL_PERMISSIONS,
                )
            )
            raise UnprocessableEntityException(self.NOT_EQUAL_PERMISSIONS, error=self.BAD_PERMISSIONS)

        common_permission = from_user.permission
        if common_permission == Permissions.DEFAULT and self._merging_service.exists_requests_intersection(data):
            logger.success(log(_operation_id, OPERATION_IS_OVER__EXISTS_INTERSECTION_OF_REQUESTS))
            raise UnprocessableEntityException(self.INTERSECTION_REQUESTS, error=self.REQUESTS)

        if self._merging_service.exists_participation_intersection(data):
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__EXISTS_INTERSECTION_OF_PARTICIPATION,
                )
            )
            raise UnprocessableEntityException(self.INTERSECTION_PARTICIPANTS, error=self.PARTICIPANTS)

        logger.info(log(_operation_id, PROCESSING))
        self._merging_service.merge(data)

        logger.success(log(_operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def _get_users_in_file(
        self, filters: Filters, get_file: Callable[[List[User]], BytesIO], extension: str
    ) -> FileResponse:
        users = self._user_service.get_filtered(filters)
        buffer = get_file(users)

        return FileResponse(
            buffer,
            as_attachment=True,
            filename=f"{now().strftime(settings.DATETIME_FORMAT)}_users.{extension}",
        )


class CurrentUserHandlers(metaclass=HandlersMetaclass):
    EMAIL_ALREADY_EXISTS = "The email already exists"
    INVALID_CREDENTIALS = "Invalid credentials"

    SOCIAL_CONNECTING = "Failed to get user information"
    MIN_AMOUNT_SOCIALS = f"Min amount of socials is {settings.MIN_SOCIALS_AMOUNT}"
    NOT_FOUND_ANY_FIELD_IDS = "Any field ids were not found"
    SOCIAL_ID_ALREADY_EXISTS = "Social id already exists"

    SOCIALS_AMOUNT = "socials amount"
    BAD_CREDENTIALS = "bad credentials"
    BAD_SOCIAL_ID = "bad social id"
    BAD_EMAIL = "bad email"

    def __init__(self, user_service: UserService):
        self._user_service = user_service

    def get_profile(self, request: HttpRequest, _operation_id: UUID) -> FullProfileOut:
        return FullProfileOut.from_orm(request.user)

    def update_profile(
        self, request: HttpRequest, _operation_id: UUID, data: CurrentProfileIn = Body(...)
    ) -> SuccessResponse:
        """
        422 error codes:\n
            "bad email" - some user has this email. 'null' value can set for all users
        """
        user: User = request.user
        log_kwargs = {"user_id": user.id} | data.dict()

        logger.info(log(_operation_id, STARTING, **log_kwargs))

        if self._user_service.have_others_email(user, data.email):
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__CANNOT_UPDATE_EMAIL,
                    email=user.email,
                    new_email=data.email,
                )
            )
            raise UnprocessableEntityException(self.EMAIL_ALREADY_EXISTS, error=self.BAD_EMAIL)

        logger.info(log(_operation_id, PROCESSING))
        self._user_service.update(request.user, data)

        logger.success(log(_operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def get_form_values(
        self, request: HttpRequest, _operation_id: UUID, field_id: List[str] = Query(...)
    ) -> List[FormValueOut]:
        values = self._user_service.get_last_form_values(request.user.id, set(field_id))

        return [FormValueOut(id=form_value.field_id, value=form_value.value) for form_value in values]

    def link_vkontakte(
        self, request: HttpRequest, _operation_id: UUID, credentials: VKCredentialsIn = Body(...)
    ) -> SuccessResponse:
        """
        422 error codes:\n
            "bad credentials" - invalid social credentials
            "bad social id" - this social id already exists
        """
        return self._link_social(request, VKAuth(credentials, vk_repo))

    def link_google(
        self, request: HttpRequest, _operation_id: UUID, credentials: GoogleCredentialsIn = Body(...)
    ) -> SuccessResponse:
        """
        422 error codes:\n
            "bad credentials" - invalid social credentials
            "bad social id" - this social id already exists
        """
        return self._link_social(request, GoogleAuth(credentials, google_repo))

    def link_telegram(
        self, request: HttpRequest, _operation_id: UUID, credentials: TelegramCredentialsIn = Body(...)
    ) -> SuccessResponse:
        """
        422 error codes:\n
            "bad credentials" - invalid social credentials
            "bad social id" - this social id already exists
        """
        return self._link_social(request, TelegramAuth(credentials, telegram_repo))

    def unlink_vkontakte(self, request: HttpRequest, _operation_id: UUID) -> SuccessResponse:
        """
        422 error codes:\n
            "socials amount" - at least one social network must be linked
        """
        return self._unlink_social(request, VKAuth(None, vk_repo))

    def unlink_google(self, request: HttpRequest, _operation_id: UUID) -> SuccessResponse:
        """
        422 error codes:\n
            "socials amount" - at least one social network must be linked
        """
        return self._unlink_social(request, GoogleAuth(None, google_repo))

    def unlink_telegram(self, request: HttpRequest, _operation_id: UUID) -> SuccessResponse:
        """
        422 error codes:\n
            "socials amount" - at least one social network must be linked
        """
        return self._unlink_social(request, TelegramAuth(None, telegram_repo))

    def _link_social(self, request: HttpRequest, social: SocialBase) -> SuccessResponse:
        status = social.link(request.user.id)

        match status:
            case SocialAuthStatus.UNAUTHORIZED:
                raise UnprocessableEntityException(self.INVALID_CREDENTIALS, error=self.BAD_CREDENTIALS)

            case SocialAuthStatus.SOCIAL_ID_ALREADY_EXISTS:
                raise UnprocessableEntityException(self.SOCIAL_ID_ALREADY_EXISTS, error=self.BAD_SOCIAL_ID)

            case SocialAuthStatus.OK:
                return SuccessResponse()

        raise ServerException()

    def _unlink_social(self, request: HttpRequest, social: SocialBase) -> SuccessResponse:
        if self._user_service.get_socials_amount(request.user.id) <= settings.MIN_SOCIALS_AMOUNT:
            raise UnprocessableEntityException(self.MIN_AMOUNT_SOCIALS, error=self.SOCIALS_AMOUNT)

        social.unlink(request.user.id)

        return SuccessResponse()
