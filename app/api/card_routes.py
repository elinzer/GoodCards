from flask import Blueprint, jsonify
from app.models import CardModel, card

card_routes = Blueprint('cards', __name__)


@card_routes.route('/')
def get_all():
    cards = CardModel.query.all()
    return {'cards': [card.to_dict() for card in cards]}


@card_routes.route('/<int:id>')
def get_one(id):
    card = CardModel.query.get(id)
    return card.to_dict()
