from app.models import db, Comment


def seed_comments():
    comments = [
        Comment(deck_id=1, user_id=2, comment_body='Whoa this deck is really powerful!'),
        Comment(deck_id=2, user_id=1, comment_body='This deck is seriously annoying'),
        Comment(deck_id=1, user_id=3, comment_body='I just need a few more cards from my local shop then I can build this deck'),
        Comment(deck_id=3, user_id=2, comment_body='Wish these cards were legal to play'),
    ]
    for comment in comments:
        db.session.add(comment)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
