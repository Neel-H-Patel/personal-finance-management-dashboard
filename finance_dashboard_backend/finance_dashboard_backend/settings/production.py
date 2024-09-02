# settings/production.py

from .base import *

DEBUG = False

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'backend', 'https://my-angular-bucket-dashboard.s3-website-us-east-1.amazonaws.com',
    'https://apifinancedashboard.com', 'http://fin-env.eba-qwcff6hq.us-east-1.elasticbeanstalk.com']


# Production database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'neelpatel3',
        'PASSWORD': 'Harshida0615!',
        'HOST': 'new-finance-db.cpsqokq8c3xv.us-east-1.rds.amazonaws.com',
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
