# settings/production.py

from .base import *

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'backend', '18.224.53.250', 'http://finance-dashboard-alb-259944092.us-east-2.elb.amazonaws.com']


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres-finance-db',
        'USER': 'neelpatel3',
        'PASSWORD': 'Harshida0615!',
        'HOST': 'postgres-finance-db.cheg2i2wk0rl.us-east-2.rds.amazonaws.com',
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
