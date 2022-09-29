from flask import Blueprint, jsonify
from mtgsdk import Card

card_routes = Blueprint('cards', __name__)



@card_routes.route('/green')
def get_green():


    cards = Card.where(set='afr').where(page=1).where(pageSize=10).array()

    for card in cards:
        if 'imageUrl' not in card:
            print('its not here')
        else:
            print('its here')

    return {'cards': [card for card in cards]}
