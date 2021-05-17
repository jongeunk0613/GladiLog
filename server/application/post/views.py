from flask import request, jsonify
from . import post
from flask_jwt_extended import jwt_required
from ..db.mysql_connection import DatabaseConnection

@post.route('/write', methods=['POST'])
@jwt_required()
def protected():
    return jsonify({'success': True}), 200