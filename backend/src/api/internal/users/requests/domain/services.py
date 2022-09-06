from typing import List, Optional

from api.internal.db.models import Request, User
from api.internal.db.repositories.competition import ICompetitionRepository
from api.internal.db.repositories.form_value import IFormValueRepository
from api.internal.db.repositories.participation import IParticipationRepository
from api.internal.db.repositories.request import IRequestRepository
from api.internal.db.repositories.user import IUserRepository
from api.internal.requests.domain.entities import RequestDetailsOut
from api.internal.requests.domain.services import RequestsService
from api.internal.users.requests.domain.entities import CurrentUserRequestDetailsOut


class CurrentUserRequestsService(RequestsService):
    def __init__(
        self,
        request_repo: IRequestRepository,
        competition_repo: ICompetitionRepository,
        user_repo: IUserRepository,
        participation_repo: IParticipationRepository,
        form_value_repo: IFormValueRepository,
    ):
        super(CurrentUserRequestsService, self).__init__(
            request_repo, competition_repo, user_repo, participation_repo, form_value_repo
        )

    def get_requests_from_user(self, owner: User) -> List[Request]:
        return list(self._request_repo.get_requests_from_user(owner.id))

    def get_request_from_user(self, owner: User, request_id: int) -> Optional[Request]:
        return self._request_repo.get_request_from_user(owner.id, request_id)

    def get_request_with_participation_and_forms_from_user(self, request_id: int, owner: User) -> Optional[Request]:
        return self._request_repo.get_request_with_participation_and_forms(request_id, owner_id=owner.id)

    def get_request_details(self, request: Request) -> CurrentUserRequestDetailsOut:
        details: RequestDetailsOut = super(CurrentUserRequestsService, self).get_request_details(request)

        return CurrentUserRequestDetailsOut(**details.dict())
