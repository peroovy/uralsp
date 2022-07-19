import pytest

from api.internal.db.models import User


@pytest.mark.django_db
@pytest.mark.smoke
def test_db(user: User) -> None:
    pass
