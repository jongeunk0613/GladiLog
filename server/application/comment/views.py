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



