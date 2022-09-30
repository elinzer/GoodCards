from .db import db

deck_cards = db.Table(
    'deck_cards',
    db.Model.metadata,
    db.Column('deck_id', db.Integer, db.ForeignKey('decks.id'), primary_key=True),
    db.Column('card_id', db.Integer, db.ForeignKey('cards.id'), primary_key=True)
)
