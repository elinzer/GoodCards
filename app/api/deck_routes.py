from flask import Blueprint, request, jsonify
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Deck
from flask_login import login_required, current_user
from ..forms.deck_form import DeckForm

deck_routes = Blueprint('decks', __name__)

# get all decks
@deck_routes.route('/')
def get_decks():
    decks = Deck.query.all()
    return { "decks": [deck.to_dict() for deck in decks] }

# get one deck by id
@deck_routes.route('/<int:id>')
def get_one(id):
    deck = Deck.query.get(id)
    return deck.to_dict()

# get current user decks
@deck_routes.route('/current')
@login_required
def get_current():
    current_decks = Deck.query.filter(Deck.user_id == current_user.id).all()
    return { "decks": [deck.to_dict() for deck in current_decks] }

# create a deck
@deck_routes.route('/', methods=['POST'])
@login_required
def create_deck():
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_deck = Deck(
            name=form.name.data,
            user_id=form.user_id.data,
            description=form.description.data,
            img_url=form.img_url.data
        )
        db.session.add(new_deck)
        db.session.commit()
        return jsonify(new_deck.to_dict()), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# update deck
@deck_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_deck(id):
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        deck = Deck.query.get(id)
        if deck.user_id == current_user.id:
            deck.name = form.name.data
            deck.description = form.description.data
            deck.img_url = form.img_url.data
            db.session.commit()
            return jsonify(deck.to_dict()), 200
    else:
        return {'errors': 'Unauthorized'}, 401


# delete deck
@deck_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_deck(id):
    deck = Deck.query.filter(Deck.id == id).first()
    if deck.user_id == current_user.id:
        db.session.delete(deck)
        db.session.commit()
        return jsonify({
        "message": "Deck successfully deleted",
        "status-code": 200
    }), 200
    else:
        return {"errors": "Unauthorized"} , 401
