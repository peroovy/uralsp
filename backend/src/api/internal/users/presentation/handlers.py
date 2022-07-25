from typing import Callable, List, Optional

from django.http import FileResponse, HttpRequest, StreamingHttpResponse
from django.utils.timezone import now
from ninja import Body, Query
from ninja.pagination import LimitOffsetPagination, paginate

from api.internal.auth.domain.entities import GoogleLoginIn, VKLoginIn
from api.internal.auth.domain.services import SocialService
from api.internal.db.models.user import Permissions, User
from api.internal.exceptions import NotFoundException, UnprocessableEntityException
from api.internal.responses import SuccessResponse
from api.internal.users.domain.entities import (
    CurrentProfileIn,
    Filters,
    FormValueOut,
    FullProfileOut,
    ProfileIn,
    ProfileOut,
)
from api.internal.users.domain.services import DocumentService, UserService


class UsersHandlers:
    PERMISSION_MUST_BE_DEFAULT_TYPE_ERROR = "Permission must be default or teacher"

    def __init__(self, user_service: UserService, document_service: DocumentService):
        self._user_service = user_service
        self._document_service = document_service

    @paginate(LimitOffsetPagination)
    def get_users(self, request: HttpRequest, filers: Filters = Query(...)) -> List[ProfileOut]:
        return [ProfileOut.from_orm(user) for user in self._user_service.get_users(filers)]

    def get_user(self, request: HttpRequest, user_id: int) -> FullProfileOut:
        user = self._user_service.get_user(user_id)
        if not user:
            raise NotFoundException("user")

        return FullProfileOut.from_orm(user)

    def update_user(self, request: HttpRequest, user_id: int, data: ProfileIn = Body(...)) -> SuccessResponse:
        user = self._user_service.get_user(user_id)
        if not user:
            raise NotFoundException("user")

        if (
            data.permission in [Permissions.ADMIN, Permissions.SUPER_ADMIN]
            and request.user.permission != Permissions.SUPER_ADMIN
        ):
            raise UnprocessableEntityException(self.PERMISSION_MUST_BE_DEFAULT_TYPE_ERROR)

        self._user_service.update_profile(user, data)

        return SuccessResponse()

    def get_users_xlsx(self, request: HttpRequest, filers: Filters = Query(...)) -> StreamingHttpResponse:
        users = self._user_service.get_users(filers)
        buffer = self._document_service.serialize_users_to_xlsx(users)

        return FileResponse(buffer, as_attachment=True, filename=f"{now().strftime('%Y-%m-%d %H-%M-%S')}-users.xlsx")

    def get_users_csv(self, request: HttpRequest, filters: Filters = Query(...)) -> StreamingHttpResponse:
        users = self._user_service.get_users(filters)
        buffer = self._document_service.serialize_users_to_csv(users)

        return FileResponse(buffer, as_attachment=True, filename=f"{now().strftime('%Y-%m-%d %H-%M-%S')}-users.csv")


class CurrentUserHandlers:
    MIN_SOCIAL_AMOUNT = 1

    SOCIAL_LINKING_ERROR = "Failed to get user information"
    MIN_AMOUNT_SOCIALS_ERROR = f"Min amount of socials is {MIN_SOCIAL_AMOUNT}"
    NOT_FOUND_ANY_FIELD_IDS_ERROR = "Any field ids were not found"

    def __init__(self, user_service: UserService, social_service: SocialService):
        self._user_service = user_service
        self._social_service = social_service

    def get_profile(self, request: HttpRequest) -> FullProfileOut:
        return FullProfileOut.from_orm(request.user)

    def update_profile(self, request: HttpRequest, data: CurrentProfileIn = Body(...)) -> SuccessResponse:
        self._user_service.update_profile(request.user, data)

        return SuccessResponse()

    def get_form_values(self, request: HttpRequest, field_ids: List[str] = Query(...)) -> List[FormValueOut]:
        values = self._user_service.get_last_form_values(request.user, set(field_ids))

        return [FormValueOut(id=form_value.field_id, value=form_value.value) for form_value in values]

    def link_vkontakte(self, request: HttpRequest, data: VKLoginIn) -> SuccessResponse:
        vk_id = self._social_service.try_get_vkontakte_id(data.access_token)

        return self._link_social(request, vk_id, self._user_service.update_vkontakte)

    def link_google(self, request: HttpRequest, data: GoogleLoginIn) -> SuccessResponse:
        google_id = self._social_service.try_get_google_id(data.id_token, data.client_id)

        return self._link_social(request, google_id, self._user_service.update_google)

    def unlink_vkontakte(self, request: HttpRequest) -> SuccessResponse:
        return self._unlink_social(request, self._user_service.update_vkontakte)

    def unlink_google(self, request: HttpRequest) -> SuccessResponse:
        return self._unlink_social(request, self._user_service.update_google)

    def _link_social(self, request: HttpRequest, social_id: Optional[int], update_social: Callable[[User, int], None]):
        if not social_id:
            raise UnprocessableEntityException(self.SOCIAL_LINKING_ERROR)

        update_social(request.user, social_id)

        return SuccessResponse()

    def _unlink_social(self, request: HttpRequest, update_social: Callable[[User, None], None]) -> SuccessResponse:
        if self._user_service.get_socials_amount(request.user) <= self.MIN_SOCIAL_AMOUNT:
            raise UnprocessableEntityException(self.MIN_AMOUNT_SOCIALS_ERROR)

        update_social(request.user, None)

        return SuccessResponse()
