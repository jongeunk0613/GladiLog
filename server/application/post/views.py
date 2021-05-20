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
            newPostID = db.call_procedure('GetPostLastIndex')[0]
            return jsonify({'msg': 'Post successfully created', 'newPostID': newPostID.get('id')}), 201
        except Exception as e:
            raise e

    return jsonify({'success': False}), 400


@post.route('/')
def showPosts():
    try:
        db = DatabaseConnection()
        posts = db.call_procedure('GetPosts')
        return jsonify({'data': posts})
    except Exception as e:
        raise e


@post.route('/<int:id>')
def getPost(id):
    try:
        db = DatabaseConnection()
        result = db.call_procedure('GetPost', [id])

        if not result:
            return jsonify({'msg': 'No post with the given id.'}), 400

        post = result[0]

        return jsonify({'data': post}), 200
    except Exception as e:
        raise e

@post.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def deletePost(id):
    if request.method == 'DELETE':
        try:
            db = DatabaseConnection()
            db.call_procedure('DeletePost', [id], True)
            return jsonify({'msg': 'Post successfully deleted'}), 202
        except Exception as e:
            raise e
    return jsonify({'success': False}), 400

@post.route('/edit/<int:id>', methods=['PATCH'])
@jwt_required()
def updatePost(id):
    if request.method == 'PATCH':
        try:
            data = request.get_json(force=True)

            db = DatabaseConnection()
            db.call_procedure('UpdatePost', [id, data.get('title'), data.get('body')], True)
            return jsonify({'msg': 'Post successfully updated.'}), 200
        except Exception as e:
            raise e
    return jsonify({'success': False}), 400

