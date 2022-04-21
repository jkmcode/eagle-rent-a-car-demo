from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = str(os.getenv("SECRET_KEY"))

DEBUG = True

ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",
    "eagle-rent-car.herokuapp.com",
    "rent-car-demo.herokuapp.com",
]


INSTALLED_APPS = [
    "pwa",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "core_app",
    "rest_framework",
    "corsheaders",
    "storages",
]


REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,
    "ALGORITHM": "HS256",
    "VERIFYING_KEY": None,
    "AUDIENCE": None,
    "ISSUER": None,
    "JWK_URL": None,
    "LEEWAY": 0,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
}

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "frontend/build")],
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

WSGI_APPLICATION = "backend.wsgi.application"


# Database
DATABASES = {
    "default": {
        "ENGINE": str(os.getenv("ENGINE")),
        "NAME": str(os.getenv("NAME")),
        "USER": str(os.getenv("USER")),
        "PASSWORD": str(os.getenv("PASSWORD")),
        "HOST": str(os.getenv("HOST")),
        "PORT": "5432",
    }
}

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

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

STATIC_URL = "static/"
MEDIA_URL = "/images/"

STATICFILES_DIRS = [os.path.join(BASE_DIR, "frontend/build/static")]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

PWA_CONFIG = {
    "name": "Rent a car",
    "short_name": "PWA",
    "theme_color": "#7820f5",
    "background_color": "#7820f5",
    "display": "standalone",
    "orientation": "portrait",
    "scope": "/",
    "start_url": "/",
    "icons": [
        {"src": "/static/pwa/icons/72x72.png", "type": "image/png", "sizes": "72x72"},
        {"src": "/static/pwa/icons/96x96.png", "type": "image/png", "sizes": "96x96"},
        {
            "src": "/static/pwa/icons/128x128.png",
            "type": "image/png",
            "sizes": "128x128",
        },
        {
            "src": "/static/pwa/icons/144x144.png",
            "type": "image/png",
            "sizes": "144x144",
        },
        {
            "src": "/static/pwa/icons/152x152.png",
            "type": "image/png",
            "sizes": "152x152",
        },
        {
            "src": "/static/pwa/icons/192x192.png",
            "type": "image/png",
            "sizes": "192x192",
        },
        {
            "src": "/static/pwa/icons/384x384.png",
            "type": "image/png",
            "sizes": "384x384",
        },
        {
            "src": "/static/pwa/icons/512x512.png",
            "type": "image/png",
            "sizes": "512x512",
        },
    ],
    "lang": "en",
    "dir": "ltr",
    "description": "Progressive Web app powerd by Django",
    "version": "1.",
    "manifest_version": "1.0",
    "permissions": ["notifications", "webRequest"],
    "author": "PWA-django",
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

MEDIA_ROOT = BASE_DIR / "static/images"
STATIC_ROOT = BASE_DIR / "staticfiles"

CORS_ALLOW_ALL_ORIGINS = True

AWS_QUERYSTRING_AUTH = False

DEFAULT_FILE_STORAGE = str(os.getenv("DEFAULT_FILE_STORAGE"))
AWS_S3_ACCESS_KEY_ID = str(os.getenv("AWS_S3_ACCESS_KEY_ID"))
AWS_S3_SECRET_ACCESS_KEY = str(os.getenv("AWS_S3_SECRET_ACCESS_KEY"))
AWS_STORAGE_BUCKET_NAME = str(os.getenv("AWS_STORAGE_BUCKET_NAME"))
