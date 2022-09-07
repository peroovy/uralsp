from typing import List, Optional

from django.db.transaction import atomic

from api.internal.db.models import Request, User
from api.internal.db.models.request import RequestStatus
from api.internal.db.repositories.competition import ICompetitionRepository
from api.internal.db.repositories.form_value import IFormValueRepository
from api.internal.db.repositories.participation import IParticipationRepository
from api.internal.db.repositories.request import IRequestRepository
from api.internal.db.repositories.user import IUserRepository
from api.internal.requests.domain.services import RequestsService


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

    @atomic
    def cancel_request(self, request: Request) -> None:
        self._request_repo.update(request.id, status=RequestStatus.CANCELED)

    @atomic
    def renew_request(self, request: Request) -> None:
        self._request_repo.update(request.id, status=RequestStatus.AWAITED)
