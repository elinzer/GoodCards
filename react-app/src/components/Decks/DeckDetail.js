import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import defaultCard from '../../images/defaultCard.png';
import * as deckActions from '../../store/deck';
import './DeckDetail.css'

const DeckDetail = ({decks}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const deckList = Object.values(decks);
    const sessionUser = useSelector(state => state.session.user);
    let currentDeck = deckList.find(deck => deck.id == id)
    const [deckName, setDeckName] = useState(currentDeck?.name);

    
    const handleDelete = () => {
        dispatch(deckActions.deleteDeckById(currentDeck?.id))
        history.push('/test-decks')
    }

    return (
        <div className='detail-container'>
            <div><input
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        required
                        /></div>
            <div><img src={currentDeck?.img_url} onError={(e) => e.target.src = defaultCard}/></div>
            <div>{currentDeck?.description}</div>
            <div>{sessionUser.id === currentDeck?.user_id ? (<button onClick={handleDelete}>Delete Deck</button>) : null } </div>
        </div>
    )
}

export default DeckDetail;
