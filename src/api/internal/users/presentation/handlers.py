from io import BytesIO
from typing import List, Optional

from django.http import FileResponse, HttpRequest, HttpResponse, StreamingHttpResponse
from django.utils.timezone import now
from ninja import Body, Query
from ninja.pagination import LimitOffsetPagination, paginate

from api.internal.responses import SuccessResponse
from api.internal.users.domain.entities import DefaultProfileIn, Filters, FullProfileOut, ProfileOut
from api.internal.users.domain.services import DocumentService, UserService


class UsersHandlers:
    def __init__(self, user_service: UserService, document_service: DocumentService):
        self._user_service = user_service
        self._document_service = document_service

    @paginate(LimitOffsetPagination)
    def get_users(self, request: HttpRequest, filers: Filters = Query(...)) -> List[ProfileOut]:
        return [ProfileOut.from_orm(user) for user in self._user_service.get_users(filers)]

    def get_users_xlsx(self, request: HttpRequest, filers: Filters = Query(...)) -> StreamingHttpResponse:
        users = self._user_service.get_users(filers)
        buffer = self._document_service.serialize_users_to_xlsx(users)

        return FileResponse(buffer, as_attachment=True, filename=f"{now().strftime('%Y-%m-%d %H-%M-%S')}-users.xlsx")

    def get_users_csv(self, request: HttpRequest, filters: Filters = Query(...)) -> StreamingHttpResponse:
        users = self._user_service.get_users(filters)
        buffer = self._document_service.serialize_users_to_csv(users)

        return FileResponse(buffer, as_attachment=True, filename=f"{now().strftime('%Y-%m-%d %H-%M-%S')}-users.csv")


class CurrentUserHandlers:
    def __init__(self, user_service: UserService):
        self._user_service = user_service

    def get_profile(self, request: HttpRequest) -> FullProfileOut:
        return FullProfileOut.from_orm(request.user)

    def update_profile(self, request: HttpRequest, data: DefaultProfileIn = Body(...)) -> SuccessResponse:
        self._user_service.update_profile(request.user, data)

        return SuccessResponse()
