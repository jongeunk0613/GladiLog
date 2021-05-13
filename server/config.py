import os
import datetime
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY') or 'hard to guess string'
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY') or 'hard to guess string 2'
    
    JWT_TOKEN_LOCATION = [os.getenv('JWT_TOKEN_LOCATION') or 'cookies']
    JWT_COOKIE_SECURE = os.getenv('JWT_COOKIE_SECURE').lower() in ('true', '1', 't')# true on production
    JWT_ACCESS_COOKIE_PATH = os.getenv('JWT_ACCESS_COOKIE_PATH') or '/'
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(minutes=30)
    
    MYSQL_HOST = os.getenv('DB_HOST')
    MYSQL_USER = os.getenv('DB_USERNAME')
    MYSQL_PASSWORD = os.getenv('DB_PASSWORD')
    MYSQL_NAME = os.getenv('DB_NAME')

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True


class ProductionConfig(Config):
    DEBUG = False
    TESTING = False

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,

    'default': DevelopmentConfig
}