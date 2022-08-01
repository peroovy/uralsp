from typing import Callable, List, Optional

from django.http import FileResponse, HttpRequest
from django.utils.timezone import now
from ninja import Body, Query
from ninja.pagination import LimitOffsetPagination, paginate

from api.internal.auth.domain.entities import GoogleLoginIn, VKLoginIn
from api.internal.auth.domain.services import SocialService
from api.internal.db.models.user import Permissions, User
from api.internal.exceptions import NotFoundException, UnprocessableEntityException, ForbiddenException
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
from api.internal.users.domain.services import DocumentService, UserService, OperationStatus


class UserHandlers:
    INTERSECTION_REQUESTS_ERROR = "Users have a intersected request"
    INTERSECTION_PARTICIPATION_ERROR = "Users have a intersected participation"
    NOT_EQUAL_PERMISSIONS_ERROR = "Not equal permissions"

    USER_IDS = "user ids"

    FILENAME = "{date}-users.{extension}"
    USER = "user"
    BAD_PERMISSIONS = "bad permissions"
    PERMISSION = "permission"
    INTERSECTION_REQUESTS = "requests"
    INTERSECTION_PARTICIPATION = "participation"

    def __init__(self, user_service: UserService, document_service: DocumentService):
        self._user_service = user_service
        self._document_service = document_service

    @paginate(LimitOffsetPagination)
    def get_users(self, request: HttpRequest, filers: Filters = Query(...)) -> List[ProfileOut]:
        return [ProfileOut.from_orm(user) for user in self._user_service.get_users(filers)]

    def get_user(self, request: HttpRequest, user_id: int) -> FullProfileOut:
        if not (user := self._user_service.get_user(user_id)):
            raise NotFoundException(self.USER)

        return FullProfileOut.from_orm(user)

    def update_user(self, request: HttpRequest, user_id: int, data: ProfileIn = Body(...)) -> SuccessResponse:
        if (
            data.permission in [Permissions.ADMIN, Permissions.SUPER_ADMIN]
            and request.user.permission != Permissions.SUPER_ADMIN
        ):
            raise ForbiddenException()

        if not self._user_service.update(user_id, data):
            raise NotFoundException(self.USER)

        return SuccessResponse()

    def get_users_xlsx(self, request: HttpRequest, filers: Filters = Query(...)) -> FileResponse:
        users = self._user_service.get_users(filers)
        buffer = self._document_service.serialize_users_to_xlsx(users)

        return FileResponse(
            buffer,
            as_attachment=True,
            filename=self.FILENAME.format(date=now().strftime("%Y-%m-%d %H-%M-%S"), extension="xlsx"),
        )

    def get_users_csv(self, request: HttpRequest, filters: Filters = Query(...)) -> FileResponse:
        users = self._user_service.get_users(filters)
        buffer = self._document_service.serialize_users_to_csv(users)

        return FileResponse(
            buffer,
            as_attachment=True,
            filename=self.FILENAME.format(date=now().strftime("%Y-%m-%d %H-%M-%S"), extension="csv"),
        )

    def merge_users(self, request: HttpRequest, users: MergingIn = Body(...)) -> SuccessResponse:
        status = self._user_service.merge(users.from_id, users.to_id)

        match status:
            case OperationStatus.BAD_USER_IDS:
                raise NotFoundException(self.USER_IDS)

            case OperationStatus.NOT_EQUALS_PERMISSIONS:
                raise UnprocessableEntityException(self.NOT_EQUAL_PERMISSIONS_ERROR, error=self.BAD_PERMISSIONS)

            case OperationStatus.INTERSECTION_REQUESTS_ERROR:
                raise UnprocessableEntityException(self.INTERSECTION_REQUESTS_ERROR, error=self.INTERSECTION_REQUESTS)

            case OperationStatus.INTERSECTION_PARTICIPATION_ERROR:
                raise UnprocessableEntityException(self.INTERSECTION_PARTICIPATION_ERROR, error=self.INTERSECTION_PARTICIPATION)

        return SuccessResponse()


class CurrentUserHandlers:
    MIN_SOCIAL_AMOUNT = 1

    SOCIAL_CONNECTING_ERROR = "Failed to get user information"
    MIN_AMOUNT_SOCIALS_ERROR = f"Min amount of socials is {MIN_SOCIAL_AMOUNT}"
    NOT_FOUND_ANY_FIELD_IDS_ERROR = "Any field ids were not found"

    SOCIAL_CONNECTING = "social connecting"
    SOCIALS_AMOUNT = "socials amount"

    def __init__(self, user_service: UserService, social_service: SocialService):
        self._user_service = user_service
        self._social_service = social_service

    def get_profile(self, request: HttpRequest) -> FullProfileOut:
        return FullProfileOut.from_orm(request.user)

    def update_profile(self, request: HttpRequest, data: CurrentProfileIn = Body(...)) -> SuccessResponse:
        self._user_service.update(request.user.id, data)

        return SuccessResponse()

    def get_form_values(self, request: HttpRequest, field_ids: List[str] = Query(...)) -> List[FormValueOut]:
        values = self._user_service.get_last_form_values(request.user, set(field_ids))

        return [FormValueOut(id=form_value.field_id, value=form_value.value) for form_value in values]

    def link_vkontakte(self, request: HttpRequest, data: VKLoginIn = Body(...)) -> SuccessResponse:
        vk_id = self._social_service.try_get_vkontakte_id(data.access_token)

        return self._link_social(request, vk_id, self._user_service.update_vkontakte)

    def link_google(self, request: HttpRequest, data: GoogleLoginIn = Body(...)) -> SuccessResponse:
        google_id = self._social_service.try_get_google_id(data.id_token, data.client_id)

        return self._link_social(request, google_id, self._user_service.update_google)

    def unlink_vkontakte(self, request: HttpRequest) -> SuccessResponse:
        return self._unlink_social(request, self._user_service.update_vkontakte)

    def unlink_google(self, request: HttpRequest) -> SuccessResponse:
        return self._unlink_social(request, self._user_service.update_google)

    def _link_social(self, request: HttpRequest, social_id: Optional[int], update_social: Callable[[User, int], None]):
        if not social_id:
            raise UnprocessableEntityException(self.SOCIAL_CONNECTING_ERROR, error=self.SOCIAL_CONNECTING)

        update_social(request.user, social_id)

        return SuccessResponse()

    def _unlink_social(self, request: HttpRequest, update_social: Callable[[User, None], None]) -> SuccessResponse:
        if self._user_service.get_socials_amount(request.user) <= self.MIN_SOCIAL_AMOUNT:
            raise UnprocessableEntityException(self.MIN_AMOUNT_SOCIALS_ERROR, error=self.SOCIALS_AMOUNT)

        update_social(request.user, None)

        return SuccessResponse()
