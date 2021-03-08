"""
base configuration file
"""
from os.path import abspath, dirname, join
from os import environ as env

TEST_MODE = env.get('TEST_MODE')
LOCAL_STORAGE_MODE = env.get('TEST_MODE') 

CORE_ROOT = dirname(abspath(__file__))
PROJECT_ROOT = dirname(CORE_ROOT)

SECRET_KEY = env['FLASK_SECRET_KEY']
STATIC_URL = env['STATIC_URL']
CDN_URL = env['CDN_URL']

DATABASES = {
    #'default': {
    #    'ENGINE': env['DB_ENGINE__DEFAULT'],
    #    'NAME': env['DB_NAME__DEFAULT'],
    #    'HOST': env['DB_HOST__DEFAULT'],
    #    'PORT': env['DB_PORT__DEFAULT']
    #},
    'pg': {
        'HOST': env.get('PG_HOST', 'localhost'),
        'PORT': env.get('PG_PORT', '5432'),
        'NAME': env.get('PG_NAME', 'storymap'),
        'USER': env.get('PG_USER', 'storymap'),
        'PASSWORD': env.get('PG_PASSWORD', 'storymap')
    }
}

if LOCAL_STORAGE_MODE:
    AWS_STORAGE_BUCKET_NAME = env['AWS_LOCAL_STORAGE_BUCKET_NAME']
    AWS_STORAGE_BUCKET_URL = env['AWS_LOCAL_STORAGE_BUCKET_URL']
else:
    AWS_STORAGE_BUCKET_NAME = env['AWS_STORAGE_BUCKET_NAME']
    AWS_STORAGE_BUCKET_URL = env['AWS_STORAGE_BUCKET_URL']

AWS_STORAGE_BUCKET_KEY = env['AWS_STORAGE_BUCKET_KEY']
AWS_ACCESS_KEY_ID = env['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = env['AWS_SECRET_ACCESS_KEY']
AWS_ENDPOINT_URL = env.get('AWS_ENDPOINT_URL')
GOOGLE_CLIENT_ID = env['GOOGLE_CLIENT_ID']
GOOGLE_CLIENT_SECRET = env['GOOGLE_CLIENT_SECRET']
ADMINS = env['ADMINS'].split(' ')


STORYMAPJS_DIRECTORY = env['STORYMAPJS_DIRECTORY']

FLASK_SETTINGS_MODULE = env['FLASK_SETTINGS_MODULE']
