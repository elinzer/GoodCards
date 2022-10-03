from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import CardModel, db, Deck

card_routes = Blueprint('cards', __name__)

# get all cards
@card_routes.route('/')
def get_all():
    cards = CardModel.query.all()
    return {'cards': [card.to_dict() for card in cards]}

# get one card
@card_routes.route('/<int:id>')
def get_one(id):
    card = CardModel.query.get(id)
    return card.to_dict()

# add/remove card to deck
@card_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def add_card(id):
    data = request.get_json()
    deck_id = data['deckId']
    deck = Deck.query.get(deck_id)
    # card_id = data['card_id']
    card = CardModel.query.get(id)
    if deck.user_id == current_user.id:
        if deck not in card.decks:
            card.decks.append(deck)
        else:
            card.decks.remove(deck)
        db.session.commit()
        return jsonify(card.to_dict()), 200
    else:
        return {'errors': 'Unauthorized'}, 401
