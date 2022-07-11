from django.contrib import admin
from django.urls import path

from api.internal.api import get_api

api = get_api()


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api.urls),
]
