import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import defaultCard from '../../images/defaultCard.png';
import * as deckActions from '../../store/deck';

const DeckDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const deckState = useSelector(state => state.decks);
    const sessionUser = useSelector(state => state.session.user);
    const decks = Object.values(deckState);
    let currentDeck = decks.find(deck => deck.id == id);

    const handleDelete = () => {
        dispatch(deckActions.deleteDeckById(id))
    }

    return (
        <div>
            <h1>Deck Detail</h1>
            <div>{sessionUser.id === currentDeck?.user_id ? (<><button>Edit Deck Info</button><button onClick={handleDelete}>Delete Deck</button></>) : null } </div>
            <div>{currentDeck?.name}</div>
            <div><img src={currentDeck?.img_url} onError={(e) => e.target.src = defaultCard}/></div>
            <div>{currentDeck?.description}</div>
        </div>
    )
}

export default DeckDetail;
