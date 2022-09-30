from app.models import CardModel, Deck, deck
from app.models import db
from mtgsdk import Card
from random import choice

def seed_cards():
    cards = Card.where(set='afr').where(page=1).where(pageSize=70).array()

    deck1 = Deck.query.get(1)
    deck2 = Deck.query.get(2)
    deck3 = Deck.query.get(3)
    deck4 = Deck.query.get(4)

    deck_list = [deck1, deck2, deck3, deck4]

    for card in cards:

        if 'flavor' not in cards:
            flavor = ' '
        else:
            flavor = card['flavor']

        if 'imageUrl' not in card:
            img = 'missing img'
        else:
            img = card['imageUrl']

        new_card = CardModel(name=card["name"],
                             type=card["type"],
                             rarity=card["rarity"],
                             set=card["set"],
                             text=card["text"],
                             flavor=flavor,
                             artist=card["artist"],
                             img_url=img,
                            )
        new_card.decks.append(choice(deck_list))
        db.session.add(new_card)
    db.session.commit()


def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE')
    db.session.commit()
