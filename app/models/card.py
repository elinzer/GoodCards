from app.models.deck_card import deck_cards
from .db import db
from datetime import datetime
from sqlalchemy import func

class CardModel(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    rarity = db.Column(db.String, nullable=False)
    set = db.Column(db.String, nullable=False)
    text = db.Column(db.String, nullable=True)
    flavor = db.Column(db.String, nullable=True)
    artist = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String(1000), nullable=True)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    decks = db.relationship("Deck", secondary=deck_cards, back_populates="cards")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "rarity": self.rarity,
            "set": self.set,
            "text": self.text,
            "flavor": self.flavor,
            "artist": self.artist,
            "img_url": self.img_url,
            "deck_id": self.deck_id
        }
