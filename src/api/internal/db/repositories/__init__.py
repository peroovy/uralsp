from api.internal.db.repositories.competition import CompetitionRepository
from api.internal.db.repositories.form_value import FormValueRepository
from api.internal.db.repositories.refresh_token import RefreshTokenRepository
from api.internal.db.repositories.request import RequestRepository
from api.internal.db.repositories.team import ParticipationRepository
from api.internal.db.repositories.user import UserRepository

user_repo = UserRepository()
refresh_repo = RefreshTokenRepository()
request_repo = RequestRepository()
competition_repo = CompetitionRepository()
participation_repo = ParticipationRepository()
form_value_repo = FormValueRepository()

__all__ = ["user_repo", "refresh_repo", "request_repo", "competition_repo", "participation_repo", "form_value_repo"]
