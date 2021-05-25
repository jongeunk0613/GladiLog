from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, set_access_cookies, create_refresh_token, jwt_required, unset_jwt_cookies, decode_token, current_user  #, get_jwt_identity
import MySQLdb
from . import auth
from ..db.mysql_connection import DatabaseConnection
from .. import jwt
import re


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
    try:
        decode_token(user['refresh_token'])
    except Exception:
        return jsonify({'msg': '세션이 만료되었습니다. 다시 로그인 하세요.'}), 401
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
                return jsonify({'msg': '입력되지 않은 값이 있습니다.'}), 400

            if not re.match("^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$", data.get('email')):
                return jsonify({'msg': '올바르지 않는 이메일 형식입니다.'}), 400

            if not re.match("^(?!\s*$).+", data.get('username')):
                return jsonify({'msg': '스페이스는 유저네임으로 사용될 수 없습니다.'}), 400

            if not re.match("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$", data.get('password')):
                return jsonify({'msg': '비밀번호는 숫자, 문자, 특수문자로 구성된 8 길이 이상의 값이어야 합니다.'}), 400

            if not data.get('password') == data.get('password2'):
                return jsonify({'msg': '두 비밀번호의 값이 일치하지 않습니다.'}), 400

            db = DatabaseConnection()
            if db.call_procedure('GetUserWithEmail', [data.get('email')]):
                return jsonify({'msg': '이미 사용되고 있는 이메일입니다.'}), 400

            if db.call_procedure('GetUserWithUsername', [data.get('username')]):
                return jsonify({'msg': '이미 사용되고 있는 유저네임입니다.'}), 400

            db.call_procedure('CreateUser', [data.get('email'), data.get('username'), generate_password_hash(data.get('password'))], True)
            return ({'msg': '회원가입 성공. 로그인 페이지로 이동중...'}), 201
        except (MySQLdb.Error, MySQLdb.Warning) as e:
            raise e


@auth.route('/signin', methods=['POST'])
def signin():
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            if not data.get('username') or not data.get('password'):
                return jsonify({'msg': '입력되지 않은 값이 있습니다.'}), 400

            db = DatabaseConnection()
            result = db.call_procedure('GetUserWithUsername', [data.get('username')])

            if not result:
                return jsonify({'msg': '입력받은 유저네임의 계정이 존재하지 않습니다.'}), 400

            user = result[0]

            if check_password_hash(user['password_hash'], data.get('password')):
                access_token = create_access_token(identity=user['username'])
                refresh_token = create_refresh_token(identity=user)
                db.call_procedure('UpdateUserRefreshToken', [data.get('username'), refresh_token], True)
                resp = jsonify({'success': True, 'username': data.get('username')})
                set_access_cookies(resp, access_token)
                return resp, 200
            else:
                return jsonify({'msg': '비밀번호가 틀렸습니다. 다시 시도하세요.'}), 400
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
    print(current_user.get('id'))
    return jsonify({'success': True}), 200
