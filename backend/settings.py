from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
import os
from dotenv import load_dotenv
load_dotenv()

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = str(os.getenv('SECRET_KEY'))

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'eagle-rent-car.herokuapp.com', 'rent-car-demo.herokuapp.com']

# Application definition

INSTALLED_APPS = [
    'pwa',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'core_app',
    'rest_framework',
    'corsheaders',
    'storages',

    #'webpack_boilerplate'
]


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',

    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'frontend/build') 
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
DATABASES = {
    'default': {
        'ENGINE': str(os.getenv('ENGINE')),
        'NAME': str(os.getenv('NAME')),
        'USER': str(os.getenv('USER')),
        'PASSWORD': str(os.getenv('PASSWORD')),
        'HOST': str(os.getenv('HOST')),
        'PORT' : '5432',        
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'
MEDIA_URL = '/images/'

STATICFILES_DIRS = [
    #BASE_DIR / 'static',
    #BASE_DIR / 'frontend/build',
    #BASE_DIR / 'frontend/build/static'

    os.path.join(BASE_DIR, 'frontend/build/static')
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

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
                {
                        "src": "/static/pwa/icons/72x72.png",
                        "type": "image/png",
                        "sizes": "72x72"
                },
                {
                        "src": "/static/pwa/icons/96x96.png",
                        "type": "image/png",
                        "sizes": "96x96"
                },
                {
                        "src": "/static/pwa/icons/128x128.png",
                        "type": "image/png",
                        "sizes": "128x128"
                },
                {
                        "src": "/static/pwa/icons/144x144.png",
                        "type": "image/png",
                        "sizes": "144x144"
                },
                {
                        "src": "/static/pwa/icons/152x152.png",
                        "type": "image/png",
                        "sizes": "152x152"
                },
                {
                        "src": "/static/pwa/icons/192x192.png",
                        "type": "image/png",
                        "sizes": "192x192"
                },
                {
                        "src": "/static/pwa/icons/384x384.png",
                        "type": "image/png",
                        "sizes": "384x384"
                },
                {
                        "src": "/static/pwa/icons/512x512.png",
                        "type": "image/png",
                        "sizes": "512x512"
                }
                ],
        "lang": "en",
        "dir": "ltr",
        "description": "Progressive Web app powerd by Django",
        "version": "1.",
        "manifest_version": "1.0",
        "permissions": [
                "notifications",
                "webRequest"
        ],
        "author": "PWA-django"
}


# PWA_APP_NAME = 'Nazwa'
# PWA_APP_DESCRIPTION = "My app description"
# PWA_APP_THEME_COLOR  = '#0A0302'
# PWA_APP_BACKGROUND_COLOR = '#ffffff' 
# PWA_APP_DISPLAY = 'standalone'
# PWA_APP_SCOPE = '/'
# PWA_APP_ORIENTATION = 'any'
# PWA_APP_START_URL = '/' 
# PWA_APP_STATUS_BAR_COLOR = 'default'
# PWA_APP_ICONS = [ { 'src': '/static/images/my_app_icon.png', 'sizes': '160x160' } ] 
# PWA_APP_ICONS_APPLE = [ { 'src': '/static/images/my_apple_icon.png', 'sizes': '160x160' } ] 
# PWA_APP_SPLASH_SCREEN = [
#      { 
#         'src': '/static/images/icons/splash-640x1136.png',
#         'media': '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)' } 
# ]
# PWA_APP_DIR = 'ltr' 
# PWA_APP_LANG = 'en-US'

# STATICFILES_DIRS = (
#     os.path.join(os.path.join(BASE_DIR, 'frontend'), 'build', 'static'),
# )

# WEBPACK_LOADER = {
#     'MANIFEST_FILE': os.path.join(BASE_DIR, "frontend/build/manifest.json"),
# }

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

MEDIA_ROOT = BASE_DIR / 'static/images'
STATIC_ROOT = BASE_DIR / 'staticfiles'  

CORS_ALLOW_ALL_ORIGINS = True

AWS_QUERYSTRING_AUTH = False

DEFAULT_FILE_STORAGE = str(os.getenv('DEFAULT_FILE_STORAGE'))
AWS_S3_ACCESS_KEY_ID = str(os.getenv('AWS_S3_ACCESS_KEY_ID'))
AWS_S3_SECRET_ACCESS_KEY = str(os.getenv('AWS_S3_SECRET_ACCESS_KEY'))
AWS_STORAGE_BUCKET_NAME = str(os.getenv('AWS_STORAGE_BUCKET_NAME'))

# if os.getcwd() == '/app':
#     DEBUG = False