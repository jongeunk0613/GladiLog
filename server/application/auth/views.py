from flask import request, jsonify, make_response, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, set_access_cookies, create_refresh_token, jwt_required, unset_jwt_cookies, current_user, get_jwt_identity
import MySQLdb
from . import auth
from ..db.mysql_connection import DatabaseConnection
from .. import jwt


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    db = DatabaseConnection()
    user = db.call_procedure('GetUser', [identity])[0]
    return user


@auth.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        try:
            db = DatabaseConnection()
            data = request.get_json(force=True)
            db.call_procedure('CreateUser', [data.get('email'), data.get('username'), generate_password_hash(data.get('password'))], True)
        except (MySQLdb.Error, MySQLdb.Warning) as e:
            raise e
        return jsonify({'success': True})


@auth.route('/signin', methods=['POST'])
def signin():
    if request.method == 'POST':
        try:
            db = DatabaseConnection()
            data = request.get_json(force=True)
            user = db.call_procedure('GetUser', [data.get('username')])[0]

            if check_password_hash(user['password_hash'], data.get('password')):
                access_token = create_access_token(identity=user['username'])
                refresh_token = create_refresh_token(identity=user)
                resp = jsonify({'success': True})
                set_access_cookies(resp, access_token)
                return resp, 200
            else:
                return "BAD"

            return "SIGNIN"
        except Exception as e:
            raise e


@auth.route('/logout')
def signout():
    resp = jsonify({'success': True})
    unset_jwt_cookies(resp)
    return resp


@auth.route('/protected')
@jwt_required()
def protected():
    return jsonify({'success': True}), 200