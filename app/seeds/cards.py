from app.models import CardModel
from app.models import db
from mtgsdk import Card

def seed_cards():
    cards = Card.where(set='afr').where(page=1).where(pageSize=2).array()

    for card in cards:
        new_card = CardModel(name=card["name"],
                             colors=card.colors,
                             type=card.type,
                             rarity=card.rarity,
                             set=card.set,
                             text=card.text,
                             flavor=card.flavor,
                             artist=card.artist,
                             img_url=card.imageUrl,
                            )
        db.session.add(new_card)
    db.session.commit()


def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE')
    db.session.commit()
