from flask import request, jsonify
from . import comment
from flask_jwt_extended import jwt_required, current_user
from ..db.mysql_connection import DatabaseConnection


@comment.route('/create/<int:id>', methods=['POST'])
@jwt_required()
def createComment(id):
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            if not data.get('body'):
                return jsonify({'msg': '입력되지 않은 값이 있습니다.'}), 400
            db = DatabaseConnection()
            db.call_procedure('CreateComment', [data.get('body'), current_user.get('id'), id], True)
            newComment = db.call_procedure('GetLastComment')[0]
            return jsonify({'msg': '댓글 작성 성공', 'newComment': newComment}), 201
        except Exception as e:
            raise e
    return jsonify({'success': False}), 400


@comment.route('/get', methods=['GET'])
def getComments():
    try:
        postID = request.args.get('postID')

        if not postID:
            return jsonify({'msg': '입력되지 않은 값이 있습니다.'}), 400

        db = DatabaseConnection()
        comments = db.call_procedure('GetComments', [postID])
        return jsonify({'data': comments})
    except Exception as e:
        raise e


@comment.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def deleteComment(id):
    if request.method == 'DELETE':
        try:
            db = DatabaseConnection()
            user = db.call_procedure('GetUserWithID', [current_user.get('id')])[0]

            post = db.call_procedure('GetComment', [id])[0]

            if user.get('username') == post.get('username'):
                db.call_procedure('DeleteComment', [id], True)
                return jsonify({'msg': '댓글 삭제 성공'}), 202
            else:
                return jsonify({'msg': '접근 제한. 해당 댓글의 작성자만 삭제할 수 있습니다.'}), 403
        except Exception as e:
            raise e
    return jsonify({'success': False}), 400


@comment.route('/<int:id>')
def getComment(id):
    try:
        db = DatabaseConnection()
        result = db.call_procedure('GetComment', [id])

        if not result:
            return jsonify({'msg': '입력받은 ID의 댓글이 존재하지 않습니다.'}), 400

        comment = result[0]

        return jsonify({'data': comment}), 200
    except Exception as e:
        raise e


@comment.route('/update/<int:id>', methods=['PATCH'])
@jwt_required()
def updateComment(id):
    if request.method == 'PATCH':
        try:
            data = request.get_json(force=True)

            db = DatabaseConnection()
            user = db.call_procedure('GetUserWithID', [current_user.get('id')])[0]
            comment = db.call_procedure('GetComment', [id])[0]

            if user.get('username') == comment.get('username'):
                db.call_procedure('UpdateComment', [id, data.get('body')], True)
            else:
                return jsonify({'msg': '접근 제한. 해당 댓글의 작성자만 수정할 수 있습니다.'}), 403
            return jsonify({'msg': '댓글 수정 성공'}), 200
        except Exception as e:
            raise e
    return jsonify({'success': False}), 400