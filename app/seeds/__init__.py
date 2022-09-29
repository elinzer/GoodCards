from flask.cli import AppGroup
from .comments import seed_comments, undo_comments
from .decks import seed_decks, undo_decks
from .users import seed_users, undo_users
from .cards import seed_cards, undo_cards

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_decks()
    seed_cards()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_decks()
    undo_cards()
    undo_comments()
    # Add other undo functions here
