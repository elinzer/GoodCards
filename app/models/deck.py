from .db import db
from datetime import datetime
from sqlalchemy import func
from .deck_card import deck_cards

class Deck(db.Model):
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    cards = db.relationship("CardModel", secondary=deck_cards, back_populates='decks')

    comments = db.relationship('Comment', back_populates='deck', cascade='all, delete')
    user = db.relationship('User', back_populates='decks')

    def to_dict(self):
        return {
           "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "description": self.description,
            "img_url": self.img_url,
            "card_ids": [card.id for card in self.cards],
            "created_at": self.created_at,
        }
