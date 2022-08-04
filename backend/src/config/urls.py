from django.urls import path

from api.internal.api import get_api

api = get_api()

urlpatterns = [
    path("", api.urls),
]
