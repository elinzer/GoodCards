from .db import db
from datetime import datetime
from sqlalchemy import func

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key = True)
    deck_id = db.Column(db.Integer, db.ForeignKey('decks.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    comment_body = db.Column(db.String, nullable=False)

    created_at = db.Column("created_at", db.DateTime, default=func.now())
    updated_at = db.Column("updated_at", db.DateTime, default=func.now(), onupdate=func.now())

    deck = db.relationship('Deck', back_populates='comments')
    user = db.relationship('User', back_populates='comments')
