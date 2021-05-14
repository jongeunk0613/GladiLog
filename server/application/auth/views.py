from flask import request, jsonify, make_response, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, set_access_cookies, create_refresh_token, jwt_required, unset_jwt_cookies, decode_token # current_user, get_jwt_identity
import MySQLdb
from . import auth
from ..db.mysql_connection import DatabaseConnection 
from .. import jwt


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    db = DatabaseConnection()
    user = db.call_procedure('GetUserWithUsername', [identity])[0]
    return user


@jwt.expired_token_loader
def expired_token_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    db = DatabaseConnection()
    user = db.call_procedure('GetUserWithUsername', [identity])[0]
    rfsh_token = decode_token(user['refresh_token'])
    access_token = create_access_token(identity=user['username'])
    resp = jsonify({'success': True})
    set_access_cookies(resp, access_token)
    return resp, 200


@auth.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            if not data.get('email') or not data.get('username') or not data.get('password'):
                return jsonify({'msg': 'One of the fields is missing.'}), 400

            db = DatabaseConnection()
            if db.call_procedure('GetUserWithEmail', [data.get('email')]):
                return jsonify({'msg': 'Email has already been taken.'}), 400

            if db.call_procedure('GetUserWithUsername', [data.get('username')]):
                return jsonify({'msg': 'Username has already been taken.'}), 400

            db.call_procedure('CreateUser', [data.get('email'), data.get('username'), generate_password_hash(data.get('password'))], True)
            return ({'msg': 'Account created. Redirecting to login page...'}), 201
        except (MySQLdb.Error, MySQLdb.Warning) as e:
            raise e


@auth.route('/signin', methods=['POST'])
def signin():
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            if not data.get('username') or not data.get('password'):
                return jsonify({'msg': 'One of the fields is missing.'}), 400

            db = DatabaseConnection()
            result = db.call_procedure('GetUserWithUsername', [data.get('username')])

            if not result:
                return jsonify({'msg': 'An account with the given username does not exist.'}), 400

            user = result[0]

            if check_password_hash(user['password_hash'], data.get('password')):
                access_token = create_access_token(identity=user['username'])
                refresh_token = create_refresh_token(identity=user)
                db.call_procedure('UpdateUserRefreshToken', [data.get('username'), refresh_token], True)
                resp = jsonify({'success': True})
                set_access_cookies(resp, access_token)
                return resp, 200
            else:
                return jsonify({'msg': 'Incorrect password. Try again'}), 400
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