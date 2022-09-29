from app.models import Deck, db


def seed_decks():
    decks = [
        Deck(name='Deck1', user_id=1, description='super powerful deck', img_url='https://media.wizards.com/2020/znr/en_uXovtDdaMj.png'),
        Deck(name='Deck2', user_id=2, description='annoying removal deck', img_url='https://m.media-amazon.com/images/I/51DZ1GUwpaL._AC_.jpg'),
        Deck(name='Dumb Deck', user_id=1, description='not legal, just silly', img_url='https://scg-static.starcitygames.com/articles/2021/10/5331f789-eleven-the-mage.png'),
        Deck(name='Not Legal', user_id=3, description='not legal, just fun', img_url='https://cdn-prod.scalefast.com/public/assets/user/10751401/sample/dc03d7614cddfc28bba8621c9267d537.png'),
    ]
    for deck in decks:
        db.session.add(deck)
    db.session.commit()


def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
