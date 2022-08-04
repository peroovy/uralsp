<<<<<<< HEAD
from django.contrib import admin
from django.urls import path

from api.internal.api import get_api

api = get_api()

urlpatterns = [
    path("api/", api.urls),
]
=======
from django.contrib import admin
from django.urls import path

from api.internal.api import get_api

api = get_api()

urlpatterns = [
    path("", api.urls),
]
>>>>>>> 92df798cab8d20e598ef33118f85d3c16de0a9d5
