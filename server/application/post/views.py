from flask import request, jsonify
from . import auth
from flask_jwt_extended import jwt_required
from ..db.mysql_connection import DatabaseConnection

@auth.route('/write')
@jwt_required()
def protected():
    return jsonify({'success': True}), 200