from typing import Callable, List, Optional

from django.http import FileResponse, HttpRequest
from django.utils.timezone import now
from ninja import Body, Query
from ninja.pagination import LimitOffsetPagination, paginate

from api.internal.auth.domain.entities import GoogleLoginIn, VKLoginIn
from api.internal.auth.domain.services import SocialService
from api.internal.exceptions import ForbiddenException, NotFoundException, UnprocessableEntityException
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
from api.internal.users.domain.services import DocumentService, UserService, MergingService


class UserHandlers:
    INTERSECTION_REQUESTS = "Users have a intersected request"
    INTERSECTION_PARTICIPATION = "Users have a intersected participation"
    NOT_EQUAL_PERMISSIONS = "Not equal permissions"

    USER_IDS = "user ids"

    FILENAME = "{date}-users.{extension}"
    USER = "user"
    BAD_PERMISSIONS = "bad permissions"
    PERMISSION = "permission"
    REQUESTS = "requests"
    PARTICIPATION = "participation"

    def __init__(self, user_service: UserService, merging_service: MergingService, document_service: DocumentService):
        self._user_service = user_service
        self._merging_service = merging_service
        self._document_service = document_service

    @paginate(LimitOffsetPagination)
    def get_users(self, request: HttpRequest, filers: Filters = Query(...)) -> List[ProfileOut]:
        return [ProfileOut.from_orm(user) for user in self._user_service.get_filtered(filers)]

    def get_user(self, request: HttpRequest, user_id: int) -> FullProfileOut:
        if not (user := self._user_service.get_user(user_id)):
            raise NotFoundException(self.USER)

        return FullProfileOut.from_orm(user)

    def update_user(self, request: HttpRequest, user_id: int, data: ProfileIn = Body(...)) -> SuccessResponse:
        if not (user := self._user_service.get_user(user_id)):
            raise NotFoundException(self.USER)

        if not self._user_service.has_access(request.user, data.permission):
            raise ForbiddenException()

        self._user_service.update(user, data)

        return SuccessResponse()

    def get_users_xlsx(self, request: HttpRequest, filers: Filters = Query(...)) -> FileResponse:
        users = self._user_service.get_filtered(filers)
        buffer = self._document_service.serialize_users_to_xlsx(users)

        return FileResponse(
            buffer,
            as_attachment=True,
            filename=self.FILENAME.format(date=now().strftime("%Y-%m-%d %H-%M-%S"), extension="xlsx"),
        )

    def get_users_csv(self, request: HttpRequest, filters: Filters = Query(...)) -> FileResponse:
        users = self._user_service.get_filtered(filters)
        buffer = self._document_service.serialize_users_to_csv(users)

        return FileResponse(
            buffer,
            as_attachment=True,
            filename=self.FILENAME.format(date=now().strftime("%Y-%m-%d %H-%M-%S"), extension="csv"),
        )

    def merge_users(self, request: HttpRequest, users: MergingIn = Body(...)) -> SuccessResponse:
        if not self._merging_service.exist_users(users):
            raise NotFoundException(self.USER_IDS)

        if not self._merging_service.equal_permissions(users):
            raise UnprocessableEntityException(self.NOT_EQUAL_PERMISSIONS, error=self.BAD_PERMISSIONS)

        if self._merging_service.exists_requests_intersection(users):
            raise UnprocessableEntityException(self.INTERSECTION_REQUESTS, error=self.REQUESTS)

        if self._merging_service.exists_participation_intersection(users):
            raise UnprocessableEntityException(
                self.INTERSECTION_PARTICIPATION, error=self.PARTICIPATION
            )

        self._merging_service.merge(users)

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
        self._user_service.update(request.user, data)

        return SuccessResponse()

    def get_form_values(self, request: HttpRequest, field_ids: List[str] = Query(...)) -> List[FormValueOut]:
        values = self._user_service.get_last_form_values(request.user.id, set(field_ids))

        return [FormValueOut(id=form_value.field_id, value=form_value.value) for form_value in values]

    def link_vkontakte(self, request: HttpRequest, data: VKLoginIn = Body(...)) -> SuccessResponse:
        vk_id = self._social_service.try_get_vkontakte_id(data.access_token)

        return self._link_social(request, vk_id, self._social_service.update_vkontakte)

    def link_google(self, request: HttpRequest, data: GoogleLoginIn = Body(...)) -> SuccessResponse:
        google_id = self._social_service.try_get_google_id(data.id_token, data.client_id)

        return self._link_social(request, google_id, self._social_service.update_google)

    def unlink_vkontakte(self, request: HttpRequest) -> SuccessResponse:
        return self._unlink_social(request, self._social_service.update_vkontakte)

    def unlink_google(self, request: HttpRequest) -> SuccessResponse:
        return self._unlink_social(request, self._social_service.update_google)

    def _link_social(self, request: HttpRequest, social_id: Optional[int], update_social: Callable[[int, int], int]):
        if not social_id:
            raise UnprocessableEntityException(self.SOCIAL_CONNECTING_ERROR, error=self.SOCIAL_CONNECTING)

        update_social(request.user.id, social_id)

        return SuccessResponse()

    def _unlink_social(self, request: HttpRequest, update_social: Callable[[int, None], int]) -> SuccessResponse:
        if self._social_service.get_socials_amount(request.user.id) <= self.MIN_SOCIAL_AMOUNT:
            raise UnprocessableEntityException(self.MIN_AMOUNT_SOCIALS_ERROR, error=self.SOCIALS_AMOUNT)

        update_social(request.user.id, None)

        return SuccessResponse()
