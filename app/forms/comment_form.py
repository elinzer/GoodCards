from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    deck_id = IntegerField('Deck Id', validators=[DataRequired])
    user_id = IntegerField('User Id', validators=[DataRequired()])
    comment_body = TextAreaField('Comment', validators=[DataRequired(), Length(1,500)])
