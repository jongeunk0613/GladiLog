import time
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import config

jwt = JWTManager()
cors = CORS()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    jwt.init_app(app)
    cors.init_app(app, supports_credentials=True)

    @app.route('/time')
    def get_current_time():
        return {'time': time.time()}

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    from .post import post as post_blueprint
    app.register_blueprint(post_blueprint, url_prefix='/post')

    return app