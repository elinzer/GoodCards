from flask import Blueprint
from app.models import db, Deck

deck_routes = Blueprint('decks', __name__)


@deck_routes.route('/')
def get_decks():
    decks = Deck.query.all()
    return {"decks": [deck.to_dict() for deck in decks]}



