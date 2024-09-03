# settings/base.py

import os
from pathlib import Path
from decouple import config

# Base directory of your Django project
BASE_DIR = Path(__file__).resolve().parent.parent

# Security key (keep it secret)
SECRET_KEY = config('DJANGO_SECRET_KEY', default='your-default-secret-key')

# Application definition
INSTALLED_APPS = [
    # Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps
    'rest_framework',
    # 'corsheaders',
    # 'django_extensions', # Uncomment for debugging tools, if needed

    # Your apps
    'accounts',
    'budget_planner',
    'expense_tracker',
    'goal_tracker',
]

MIDDLEWARE = [
    # 'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'finance_dashboard_backend.urls'

# CORS_ALLOWED_ORIGINS = [
#     "https://apifinancedashboard.com",
#     "https://www.apifinancedashboard.com",  # If applicable
#     "http://fin-env.eba-qwcff6hq.us-east-1.elasticbeanstalk.com",
#     "https://api.apifinancedashboard.com",
# ]

# CORS_ALLOW_CREDENTIALS = True

# CORS_ALLOW_METHODS = [
#     'GET',
#     'POST',
#     'PUT',
#     'PATCH',
#     'DELETE',
#     'OPTIONS'
# ]

# CORS_ALLOW_HEADERS = [
#     'authorization',
#     'content-type',
#     'x-csrf-token',
#     'x-requested-with',
#     'accept',
#     'origin',
#     'user-agent',
#     'x-api-key',
#     'x-client-id',
# ]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'finance_dashboard_backend.wsgi.application'

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

# Password validation
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
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

CSRF_COOKIE_SECURE = True  # Use HTTPS
CSRF_COOKIE_HTTPONLY = False  # Set to False if you need JavaScript to read the cookie
CSRF_COOKIE_SAMESITE = 'Lax'  # Set to 'Lax' to allow same-site requests
CSRF_TRUSTED_ORIGINS = [
    'https://apifinancedashboard.com',
    'https://api.apifinancedashboard.com',
]

SESSION_COOKIE_SECURE = True  # Use HTTPS
SESSION_COOKIE_SAMESITE = 'Lax'  # Adjust as needed (e.g., 'None' for cross-site cookies)
SESSION_COOKIE_HTTPONLY = False  # Prevent JavaScript access to session cookie

SECURE_SSL_REDIRECT = True  

CSRF_TRUSTED_ORIGINS = [
    'https://apifinancedashboard.com',
    'https://www.apifinancedashboard.com',  # If applicable
    "http://fin-env.eba-qwcff6hq.us-east-1.elasticbeanstalk.com",
    "https://api.apifinancedashboard.com",
]

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'accounts.CustomUser'