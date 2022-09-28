from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, StringField, TextAreaField
from wtforms.validators import DataRequired

class DeckForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    user_id = IntegerField('User Id', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    image_url = StringField('Image', validators=[DataRequired()])
