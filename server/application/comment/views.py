from flask import request, jsonify
from . import comment
from flask_jwt_extended import jwt_required, current_user
from ..db.mysql_connection import DatabaseConnection


@comment.route('/create/<int:id>', methods=['POST'])
@jwt_required
def createComment(id):
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            if not data.get('body'):
                return jsonify({'msg': 'There are missing fields. '}), 400
            db = DatabaseConnection()
            db.call_procedure('CreateComment', [data.get('body'), current_user.get('id'), id], True)
            newComment = db.call_procedure('GetLastComment')[0]
            return jsonify({'msg': 'Post successfully created', 'newComment': newComment}), 201
        except Exception as e:
            raise e
    return jsonify({'success': False}), 400