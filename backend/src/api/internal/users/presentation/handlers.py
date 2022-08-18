from io import BytesIO
from typing import Callable, List

from django.http import FileResponse, HttpRequest
from django.utils.timezone import now
from ninja import Body, Query
from ninja.pagination import LimitOffsetPagination, paginate

from api.internal.db.models import User
from api.internal.db.repositories import google_repo, telegram_repo, vk_repo
from api.internal.exceptions import NotFoundException, ServerException, UnprocessableEntityException
from api.internal.responses import SuccessResponse
from api.internal.socials.entities import GoogleCredentialsIn, TelegramCredentialsIn, VKCredentialsIn
from api.internal.socials.services import GoogleAuth, SocialAuthStatus, SocialBase, TelegramAuth, VKAuth
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


class UserHandlers:
    INTERSECTION_REQUESTS = "Request intersects"
    INTERSECTION_PARTICIPATION = "Participation intersects"
    NOT_EQUAL_PERMISSIONS = "Permissions must be equal"
    EMAIL_ALREADY_EXISTS = "The email already exists"
    UPDATING_SELF_IS_NOT_ALLOWED = "Updating self is not allowed"
    PERMISSION_CANNOT_BE_UPDATED = "The permission cannot be updated"

    BAD_USER = "bad user"
    BAD_PERMISSIONS = "bad permissions"
    BAD_PERMISSION = "bad permission"
    BAD_EMAIL = "bad email"

    USERS = "users"
    USER = "user"
    PERMISSION = "permission"
    REQUESTS = "requests"
    PARTICIPATION = "participation"

    FILENAME = "{date}_users.{extension}"

    def __init__(self, user_service: UserService, merging_service: MergingService, document_service: UserSerializer):
        self._user_service = user_service
        self._merging_service = merging_service
        self._user_serializer = document_service

    @paginate(LimitOffsetPagination)
    def get_users(self, request: HttpRequest, filters: Filters = Query(...)) -> List[ProfileOut]:
        return [ProfileOut.from_orm(user) for user in self._user_service.get_filtered(filters)]

    def get_user(self, request: HttpRequest, user_id: int) -> FullProfileOut:
        if not (user := self._user_service.get_user(user_id)):
            raise NotFoundException(self.USER)

        return FullProfileOut.from_orm(user)

    def update_user(self, request: HttpRequest, user_id: int, data: ProfileIn = Body(...)) -> SuccessResponse:
        if not (user := self._user_service.get_user(user_id)):
            raise NotFoundException(self.USER)

        if request.user == user:
            raise UnprocessableEntityException(self.UPDATING_SELF_IS_NOT_ALLOWED, error=self.BAD_USER)

        if not self._user_service.can_update_permission(request.user, user, data.permission):
            raise UnprocessableEntityException(self.PERMISSION_CANNOT_BE_UPDATED, error=self.BAD_PERMISSION)

        if self._user_service.exists_email(user, data.email):
            raise UnprocessableEntityException(self.EMAIL_ALREADY_EXISTS, error=self.BAD_EMAIL)

        self._user_service.update(user, data)

        return SuccessResponse()

    def get_users_xlsx(self, request: HttpRequest, filers: Filters = Query(...)) -> FileResponse:
        return self._get_users_in_file(filers, self._user_serializer.to_xlsx, extension="xlsx")

    def get_users_csv(self, request: HttpRequest, filters: Filters = Query(...)) -> FileResponse:
        return self._get_users_in_file(filters, self._user_serializer.to_csv, extension="csv")

    def merge_users(self, request: HttpRequest, users: MergingIn = Body(...)) -> SuccessResponse:
        if not self._merging_service.exist_users(users):
            raise NotFoundException(self.USERS)

        if not self._merging_service.equal_permissions(users):
            raise UnprocessableEntityException(self.NOT_EQUAL_PERMISSIONS, error=self.BAD_PERMISSIONS)

        if self._merging_service.exists_requests_intersection(users):
            raise UnprocessableEntityException(self.INTERSECTION_REQUESTS, error=self.REQUESTS)

        if self._merging_service.exists_participation_intersection(users):
            raise UnprocessableEntityException(self.INTERSECTION_PARTICIPATION, error=self.PARTICIPATION)

        self._merging_service.merge(users)

        return SuccessResponse()

    def _get_users_in_file(
        self, filters: Filters, get_file: Callable[[List[User]], BytesIO], extension: str
    ) -> FileResponse:
        users = self._user_service.get_filtered(filters)
        buffer = get_file(users)

        return FileResponse(
            buffer,
            as_attachment=True,
            filename=self.FILENAME.format(date=now().strftime("%Y-%m-%d %H-%M-%S"), extension=extension),
        )


class CurrentUserHandlers:
    MIN_SOCIAL_AMOUNT = 1

    EMAIL_ALREADY_EXISTS = "The email already exists"
    INVALID_CREDENTIALS = "Invalid credentials"
    BAD_EMAIL = "bad email"

    SOCIAL_CONNECTING = "Failed to get user information"
    MIN_AMOUNT_SOCIALS = f"Min amount of socials is {MIN_SOCIAL_AMOUNT}"
    NOT_FOUND_ANY_FIELD_IDS = "Any field ids were not found"
    SOCIAL_ID_ALREADY_EXISTS = "Social id already exists"

    SOCIALS_AMOUNT = "socials_amount"
    BAD_CREDENTIALS = "bad credentials"
    BAD_SOCIAL_ID = "bad social id"

    def __init__(self, user_service: UserService):
        self._user_service = user_service

    def get_profile(self, request: HttpRequest) -> FullProfileOut:
        return FullProfileOut.from_orm(request.user)

    def update_profile(self, request: HttpRequest, data: CurrentProfileIn = Body(...)) -> SuccessResponse:
        if self._user_service.exists_email(request.user, data.email):
            raise UnprocessableEntityException(self.EMAIL_ALREADY_EXISTS, error=self.BAD_EMAIL)

        self._user_service.update(request.user, data)

        return SuccessResponse()

    def get_form_values(self, request: HttpRequest, field_id: List[str] = Query(...)) -> List[FormValueOut]:
        values = self._user_service.get_last_form_values(request.user.id, set(field_id))

        return [FormValueOut(id=form_value.field_id, value=form_value.value) for form_value in values]

    def link_vkontakte(self, request: HttpRequest, credentials: VKCredentialsIn = Body(...)) -> SuccessResponse:
        return self._link_social(request, VKAuth(credentials, vk_repo))

    def link_google(self, request: HttpRequest, credentials: GoogleCredentialsIn = Body(...)) -> SuccessResponse:
        return self._link_social(request, GoogleAuth(credentials, google_repo))

    def link_telegram(self, request: HttpRequest, credentials: TelegramCredentialsIn = Body(...)) -> SuccessResponse:
        return self._link_social(request, TelegramAuth(credentials, telegram_repo))

    def unlink_vkontakte(self, request: HttpRequest) -> SuccessResponse:
        return self._unlink_social(request, VKAuth(None, vk_repo))

    def unlink_google(self, request: HttpRequest) -> SuccessResponse:
        return self._unlink_social(request, GoogleAuth(None, google_repo))

    def unlink_telegram(self, request: HttpRequest) -> SuccessResponse:
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
        if self._user_service.get_socials_amount(request.user.id) <= self.MIN_SOCIAL_AMOUNT:
            raise UnprocessableEntityException(self.MIN_AMOUNT_SOCIALS, error=self.SOCIALS_AMOUNT)

        social.unlink(request.user.id)

        return SuccessResponse()
