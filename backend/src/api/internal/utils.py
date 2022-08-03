from typing import Dict, Optional


def get_strip_filters(**kwargs: Optional[str]) -> Dict[str, str]:
    return dict([*map(lambda p: [p[0], p[1].strip()], filter(lambda p: p[1] is not None, kwargs.items()))])
