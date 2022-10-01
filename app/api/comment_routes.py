from flask import Blueprint, request, jsonify
from app.models import comment, db, Comment
from flask_login import login_required, current_user
from ..forms.comment_form import CommentForm
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

# get all comments
@comment_routes.route('/')
def get_comments():
    comments = Comment.query.all()
    return { "comments": [comment.to_dict() for comment in comments] }

# get current user comments
@comment_routes.route('/current')
@login_required
def get_current():
    current_comments = Comment.query.filter(Comment.user_id == current_user.id).all()
    return { "comments": [comment.to_dict() for comment in current_comments] }

# create a comment
@comment_routes.route('/', methods=['POST'])
@login_required
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            deck_id=form.deck_id.data,
            user_id=form.user_id.data,
            comment_body=form.comment_body.data
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.to_dict()), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# update comment
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment.query.get(id)
        if comment.user_id == current_user.id:
            comment.user_id = comment.user_id
            comment.deck_id = comment.deck_id
            comment.comment_body = form.comment_body.data
            db.session.commit()
            return jsonify(comment.to_dict()), 200
    else:
        return {'errors': 'Unauthorized'}, 401


#delete comment
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return jsonify({
        "message": "Comment successfully deleted",
        "status-code": 200
    }), 200
    else:
        return {"errors": "Unauthorized"} , 401
