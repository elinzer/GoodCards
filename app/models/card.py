from .db import db
from datetime import datetime
from sqlalchemy import func

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    colors = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    rarity = db.Column(db.String, nullable=False)
    set = db.Column(db.String, nullable=False)
    text = db.Column(db.String, nullable=False)
    flavor = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    deck = db.relationship("Deck", back_populates="cards")
