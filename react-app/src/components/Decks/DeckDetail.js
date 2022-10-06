import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import defaultCard from '../../images/defaultCard.png';
import * as deckActions from '../../store/deck';
import './DeckDetail.css'
import CommentDisplay from '../Comments/CommentDisplay';
import DeckCards from '../Cards/DeckCards';

const DeckDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const refOne = useRef(null);
    const refTwo = useRef(null);
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const deckState = useSelector(state => state.decks)
    const deckList = Object.values(deckState);
    let currentDeck = deckList?.find(deck => deck.id == id);

    const [deckName, setDeckName] = useState(currentDeck?.name);
    const [description, setDescription] = useState(currentDeck?.description);
    const [imageUrl, setImageUrl] = useState(currentDeck?.img_url)


    const handleDelete = () => {
        dispatch(deckActions.deleteDeckById(currentDeck?.id))
        history.push('/my-decks')
    }

    const handleEdit = () => {
        const editInfo = {
            name: deckName,
            user_id: sessionUser.id,
            description: description,
            img_url: imageUrl
        }

        dispatch(deckActions.editDeck(editInfo, currentDeck?.id))
    }

    const handleClickOne = () => {
        refOne.current.focus()
    }

    const handleClickTwo = () => {
        refTwo.current.focus()
    }

    return (
        <div className='detail-container'>
            <div className='deck-name-container'>
                <input
                    className='deck-name-input'
                    ref={refOne}
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    readOnly={sessionUser?.id === currentDeck?.user_id ? false : true}
                    required
                />
                <div>
                    {sessionUser?.id === currentDeck?.user_id ? (<button onClick={handleClickOne}><i class="fa-regular fa-pen-to-square"></i></button>) : null}
                </div>
            </div>
            <div className='image-n-description'>
                <div>
                    <img style={{ maxHeight: '340px', maxWidth: '235px' }} src={currentDeck?.img_url} onError={(e) => e.target.src = defaultCard} />
                </div>
                <div>
                    <label className='deck-label'>About this deck
                    <input
                        className='deck-description'
                        ref={refTwo}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        readOnly={sessionUser?.id === currentDeck?.user_id ? false : true}
                        required
                    /></label>
                </div>
            <div>
                {sessionUser?.id === currentDeck?.user_id ? (<button onClick={handleClickTwo}><i class="fa-regular fa-pen-to-square"></i></button>) : null}
            </div>
            </div>
            <div>
                {sessionUser?.id === currentDeck?.user_id ? (<><button onClick={handleEdit}>Save changes</button><button onClick={handleDelete}>Delete Deck</button></>) : null}
            </div>
            <div className='comment-container'>
                <CommentDisplay deck={currentDeck} />
            </div>
            <div>
                <DeckCards deck={currentDeck}/>
            </div>
        </div>
    )
}

export default DeckDetail;
