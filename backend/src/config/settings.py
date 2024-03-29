"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 4.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""
import logging
import os.path
from datetime import timedelta
from pathlib import Path

import loguru
from environ import Env
from loguru import logger
from notifiers.logging import NotificationHandler

env = Env()
env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY", str)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG", bool, False)

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "debug_toolbar",
    "api",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "api.middleware.ProcessInternalErrorMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": env("POSTGRES_DB", str),
        "USER": env("POSTGRES_USER", str),
        "PASSWORD": env("POSTGRES_PASSWORD", str),
        "HOST": env("POSTGRES_HOST", str),
        "PORT": env("POSTGRES_PORT", int),
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True
USE_L10N = True

USE_TZ = True

DATETIME_FORMAT = "%Y-%m-%d %H-%M-%S"


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Logging


LOGS_PATH = os.path.join(BASE_DIR, "..", "logs", "file.log")
LOG_FORMAT = "[{time:YYYY-MM-DD HH:mm:ss}][{name}:{function}][{level}] {message}"
LOG_ROTATION = "00:00"
LOG_COMPRESSION = "zip"

LOGGING_TELEGRAM_BOT_TOKEN = env("LOGGING_TELEGRAM_BOT_TOKEN", str)
LOGGING_TELEGRAM_CHAT_ID = env("LOGGING_TELEGRAM_CHAT_ID", str)
TELEGRAM_CHARACTERS_LIMIT = 4096

if not DEBUG:
    logger.remove()

logger.add(
    LOGS_PATH,
    level=logging.DEBUG if DEBUG else logging.INFO,
    filter=lambda record: "telegram" not in record["extra"],
    format=LOG_FORMAT,
    rotation=LOG_ROTATION,
    compression=LOG_COMPRESSION,
    backtrace=True,
    diagnose=True,
    enqueue=True,
)

if not DEBUG:
    logger.add(
        NotificationHandler(
            "telegram",
            defaults={"token": LOGGING_TELEGRAM_BOT_TOKEN, "chat_id": LOGGING_TELEGRAM_CHAT_ID},
        ),
        level=logging.ERROR,
        filter=lambda record: "telegram" in record["extra"],
        format=LOG_FORMAT,
        backtrace=False,
        diagnose=False,
        enqueue=True,
    )


# Social Authentication

REFRESH_TOKEN_COOKIE = "sp_rt"

ACCESS_TOKEN_TTL = timedelta(minutes=30)
REFRESH_TOKEN_TTL = timedelta(days=10)

OAUTH_TELEGRAM_BOT_TOKEN = env("OAUTH_TELEGRAM_BOT_TOKEN", str)

VKONTAKTE_APP_ID = env("VKONTAKTE_APP_ID", int)
VKONTAKTE_APP_SECRET_KEY = env("VKONTAKTE_APP_SECRET_KEY", str)


# CORS

CORS_ALLOW_ALL_ORIGINS = True


# Business Constants

MIN_PARTICIPANTS_AMOUNT = 1
MIN_SOCIALS_AMOUNT = 1
