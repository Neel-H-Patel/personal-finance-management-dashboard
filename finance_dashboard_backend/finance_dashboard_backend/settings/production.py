# settings/production.py

from .base import *

DEBUG = False

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'backend', 'http://my-finance-bucket-angular-app.s3-website.us-east-2.amazonaws.com']


# Production database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'neelpatel3',
        'PASSWORD': 'Harshida0615!',
        'HOST': 'finance-dashboard-db.cheg2i2wk0rl.us-east-2.rds.amazonaws.com',
        'PORT': '5432',
    }
}

# # Security settings for production
# SECURE_BROWSER_XSS_FILTER = True
# SECURE_CONTENT_TYPE_NOSNIFF = True
# X_FRAME_OPTIONS = 'DENY'
# SECURE_SSL_REDIRECT = True
# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True
