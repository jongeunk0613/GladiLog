from flask import request, jsonify, make_response, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, set_access_cookies
import MySQLdb
from . import auth
from ..db.mysql_connection import DatabaseConnection


@auth.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        try:
            db = DatabaseConnection()
            data = request.get_json(force=True)
            db.call_procedure('CreateUser', [data.get('email'), data.get('username'), generate_password_hash(data.get('password'))], True)
        except (MySQLdb.Error, MySQLdb.Warning) as e:
            print(e)
            raise e
        return jsonify({'success': True})


@auth.route('/signin', methods=['POST'])
def signin():
    if request.method == 'POST':
        try:
            db = DatabaseConnection()
            data = request.get_json(force=True)
            result = db.call_procedure('GetUser', [data.get('username')])[0]

            if check_password_hash(result[3], data.get('password')):
                access_token = create_access_token(identity=result[2])
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
    return "LOGOUT"
