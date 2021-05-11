from flask import request
from werkzeug.security import generate_password_hash, check_password_hash
from . import auth
from ..db.mysql_connection import DatabaseConnection

@auth.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        try: 
            db = DatabaseConnection()
            db.open()
            data = request.get_json(force=True)
            db.cursor.execute("INSERT INTO `TB_USER` (`email`, `username`, `password_hash`, `refresh_token`) VALUES (%s, %s, %s, %s)", [data.get('email'), data.get('username'), data.get('password'), "refreshtoken"])
            db.conn.commit()
            db.close()
        except (MySQLdb.Error, MySQLdb.Warning) as e:
            print(e)
        return "SIGNUP"
    