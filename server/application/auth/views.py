from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from . import auth
from ..db.mysql_connection import DatabaseConnection
import MySQLdb

@auth.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        try:
            db = DatabaseConnection()
            data = request.get_json(force=True)
            db.call_procedure('CreateUser', (data.get('email'), data.get('username'), data.get('password'), "refreshtoken"), True);
        except (MySQLdb.Error, MySQLdb.Warning) as e:
            print(e)
            raise e
        return jsonify({'success': True})
