from flask import Blueprint, jsonify
from mtgsdk import Card

card_routes = Blueprint('cards', __name__)



@card_routes.route('/green')
def get_green():
    green_cards = Card.where(set='afr').where(color_identity='green').where(page=1).where(pageSize=2).array()
    return {'green_cards': [green_card for green_card in green_cards]}
