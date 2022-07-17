from itertools import chain

import pytest
from pydantic import ValidationError

from api.internal.user.domain.entities import DefaultProfileIn, RequestIn

WRONG_PHONE_NUMBERS = (
    *(f"+{start}8005553535" for start in chain(range(7), [9])),
    *(f"{start}8005553535" for start in chain(range(7), [9])),
    *("1" * length for length in range(1, 15)),
    *("a" * length for length in range(1, 15)),
    *("a1" * (length // 2) + "a" * (length % 2) for length in range(6)),
    *("8" * 11 + "a" * amount for amount in range(1, 6)),
    *("8" * 11 + " " + "a" * amount for amount in range(1, 6)),
    *("8" * 11 + " " * amount for amount in range(1, 6)),
    *(" " * amount for amount in range(13)),
    "",
    *(f"{start}.800.55,535,35" for start in ["7", "8", "+7"]),
)


@pytest.mark.unit
@pytest.mark.parametrize("value", WRONG_PHONE_NUMBERS)
def test_default_profile_in__invalid_phone(value: str) -> None:
    with pytest.raises(ValidationError):
        DefaultProfileIn(
            name="-1",
            surname="-2",
            patronymic="-3",
            email="m@m",
            phone=value,
            city="-4",
            region="-5",
            school="-6",
            school_class="-7",
        )


@pytest.mark.unit
def test_request_in() -> None:
    json_ = {
        "competition_id": 1,
        "team_name": "Baby",
        "team": [
            {"user_id": 1, "form": [{"field_id": "passport", "value": "123"}, {"field_id": "lisense", "value": "345"}]},
            {
                "user_id": 2,
                "form": [
                    {"field_id": "passport", "value": "123"},
                ],
            },
            {"user_id": 3, "form": []},
        ],
    }

    RequestIn(**json_)

    json_["team"] = []
    RequestIn(**json_)
