from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, set_access_cookies, create_refresh_token, jwt_required, unset_jwt_cookies, decode_token, current_user  #, get_jwt_identity
import MySQLdb
from . import auth
from ..db.mysql_connection import DatabaseConnection
from .. import jwt
import re
from ..utils.validation import isValid
from ..utils.serverMessage import serverMessage


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    db = DatabaseConnection()
    user = db.call_procedure('GetUserWithID', [identity])[0]
    return user


@jwt.expired_token_loader
def expired_token_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    db = DatabaseConnection()
    user = db.call_procedure('GetUserWithID', [identity])[0]
    try:
        decode_token(user['refresh_token'])
    except Exception:
        return jsonify({'msg': serverMessage["sessionExpired"]}), 401
    access_token = create_access_token(identity=user['id'])
    resp = jsonify({'success': True})
    set_access_cookies(resp, access_token)
    return resp, 200


@auth.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            if not data.get('email') or not data.get('username') or not data.get('password'):
                return jsonify({'msg': serverMessage["missingInputField"]}), 400

            validationResult, message = isValid([data.get('email'), data.get('username'), data.get('password'), data.get('password2')])
            if not validationResult:
                return jsonify({'msg': message}), 400

            db = DatabaseConnection()
            duplicateUser = db.call_procedure('GetDuplicateUser', [data.get('email'), data.get('username')])
            if len(duplicateUser) == 2:
                return jsonify({'msg': serverMessage["emailAndUsernameTaken"]}), 400
            elif len(duplicateUser) == 1:
                if duplicateUser[0]["email"] == data.get('email') and duplicateUser[0]["username"] == data.get('username'):
                    return jsonify({'msg': serverMessage["emailAndUsernameTaken"]}), 400
                elif duplicateUser[0]["username"] == data.get('username'):
                    return jsonify({'msg': serverMessage["usernameTaken"]}), 400
                elif duplicateUser[0]["email"] == data.get('email'):
                    return jsonify({'msg': serverMessage["emailTaken"]}), 400

            db.call_procedure('CreateUser', [data.get('email'), data.get('username'), generate_password_hash(data.get('password'))], True)
            return ({'msg': serverMessage["signupSuccessful"]}), 201
        except (MySQLdb.Error, MySQLdb.Warning) as e:
            print(e)
            raise e


@auth.route('/signin', methods=['POST'])
def signin():
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            if not data.get('username') or not data.get('password'):
                return jsonify({'msg': serverMessage.missingInputField}), 400

            db = DatabaseConnection()
            result = db.call_procedure('GetUserWithUsername', [data.get('username')])

            if not result:
                return jsonify({'msg': serverMessage.noAccount}), 400

            user = result[0]

            if check_password_hash(user['password_hash'], data.get('password')):
                access_token = create_access_token(identity=user['id'])
                refresh_token = create_refresh_token(identity=user['id'])
                db.call_procedure('UpdateUserRefreshToken', [data.get('username'), refresh_token], True)
                resp = jsonify({'success': True, 'username': data.get('username')})
                set_access_cookies(resp, access_token)
                return resp, 200
            else:
                return jsonify({'msg': serverMessage.wrongPassword}), 400
        except Exception as e:
            raise e


@auth.route('/logout', methods=['POST'])
def signout():
    resp = jsonify({'success': True})
    unset_jwt_cookies(resp)
    return resp, 200


@auth.route('/protected')
@jwt_required()
def protected():
    print(current_user)
    return jsonify({'success': True}), 200
