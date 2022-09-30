from .db import db

deck_cards = db.Table(
    'deck_cards',
    db.Model.metadata,
    db.Column('deck_id', db.Integer, db.ForeignKey('decks.id')),
    db.Column('card_id', db.Integer, db.ForeignKey('cards.id'))
)
