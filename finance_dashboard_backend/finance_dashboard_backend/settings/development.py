# settings/development.py

from .base import *

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Database configuration for local development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'neelpatel',
        'USER': 'neelpatel',
        'PASSWORD': 'Harshida0615!',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}