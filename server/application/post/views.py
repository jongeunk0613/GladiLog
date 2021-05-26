from flask import request, jsonify
from . import post
from flask_jwt_extended import jwt_required, current_user
from ..db.mysql_connection import DatabaseConnection


@post.route('/create', methods=['POST'])
@jwt_required()
def createPost():
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            if not data.get('title') or not data.get('body'):
                return jsonify({'msg': '입력되지 않은 값이 있습니다.'}), 400

            db = DatabaseConnection()
            db.call_procedure('CreatePost', [data.get('title'), data.get('body'), current_user.get('id')], True)
            newPostID = db.call_procedure('GetPostLastIndex')[0]
            return jsonify({'msg': '게시글 작성 성공', 'newPostID': newPostID.get('id')}), 201
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
            return jsonify({'msg': '입력받은 ID의 게시글이 존재하지 않습니다.'}), 400

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
            user = db.call_procedure('GetUserWithID', [current_user.get('id')])[0]

            post = db.call_procedure('GetPost', [id])[0]

            if user.get('username') == post.get('username'):
                db.call_procedure('DeletePost', [id], True)
                return jsonify({'msg': '게시글 삭제 성공'}), 202
            else:
                return jsonify({'msg': '접근 제한. 해당 글의 작성자만 삭제할 수 있습니다.'}), 403
        except Exception as e:
            raise e
    return jsonify({'success': False}), 400


@post.route('/update/<int:id>', methods=['PATCH'])
@jwt_required()
def updatePost(id):
    if request.method == 'PATCH':
        try:
            data = request.get_json(force=True)

            db = DatabaseConnection()
            user = db.call_procedure('GetUserWithID', [current_user.get('id')])[0]
            post = db.call_procedure('GetPost', [id])[0]

            if user.get('username') == post.get('username'):
                db.call_procedure('UpdatePost', [id, data.get('title'), data.get('body')], True)
            else:
                return jsonify({'msg': '접근 제한. 해당 글의 작성자만 수정할 수 있습니다.'}), 403
            return jsonify({'msg': '게시글 수정 성공'}), 200
        except Exception as e:
            raise e
    return jsonify({'success': False}), 400

