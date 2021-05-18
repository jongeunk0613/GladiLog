from flask import request, jsonify
from . import post
from flask_jwt_extended import jwt_required, current_user
from ..db.mysql_connection import DatabaseConnection

@post.route('/write', methods=['POST'])
@jwt_required()
def protected():
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            if not data.get('title') or not data.get('body'):
                return jsonify({'msg': 'There are missing fields. '}), 400

            db = DatabaseConnection()
            db.call_procedure('CreatePost', [data.get('title'), data.get('body'), current_user.get('id')], True)
            return jsonify({'msg': 'Post successfully created'}), 201
        except Exception as e:
            raise e

    return jsonify({'success': True}), 200

@post.route('/')
def showPosts():
    try:
        db = DatabaseConnection()
        posts = db.call_procedure('GetPosts')
        return jsonify({'data': posts})
    except Exception as e:
        raise e