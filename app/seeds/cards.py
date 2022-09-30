from app.models import CardModel
from app.models import db
from mtgsdk import Card

def seed_cards():
    cards = Card.where(set='afr').where(page=1).where(pageSize=70).array()

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
        db.session.add(new_card)
    db.session.commit()


def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE')
    db.session.commit()
