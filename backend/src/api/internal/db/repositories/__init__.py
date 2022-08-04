from api.internal.db.repositories.competition import CompetitionRepository
from api.internal.db.repositories.default import DefaultRepository
from api.internal.db.repositories.field import FieldRepository
from api.internal.db.repositories.form_value import FormValueRepository
from api.internal.db.repositories.participation import ParticipationRepository
from api.internal.db.repositories.refresh_token import RefreshTokenRepository
from api.internal.db.repositories.request import RequestRepository
from api.internal.db.repositories.social import GoogleRepository, TelegramRepository, VKRepository
from api.internal.db.repositories.user import UserRepository

user_repo = UserRepository()
refresh_repo = RefreshTokenRepository()
request_repo = RequestRepository()
competition_repo = CompetitionRepository()
participation_repo = ParticipationRepository()
form_value_repo = FormValueRepository()
field_repo = FieldRepository()
default_repo = DefaultRepository()

vk_repo = VKRepository()
google_repo = GoogleRepository()
telegram_repo = TelegramRepository()

__all__ = [
    "user_repo",
    "refresh_repo",
    "request_repo",
    "competition_repo",
    "participation_repo",
    "form_value_repo",
    "field_repo",
    "default_repo",
    "vk_repo",
    "google_repo",
    "telegram_repo",
]
