import { useState, useRef, useEffect } from 'react';
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
    const deckState = useSelector(state => state.decks);
    const deckList = Object.values(deckState);
    let currentDeck = deckList?.find(deck => deck.id == id);
    let myDeck = sessionUser?.id === currentDeck?.user_id
    const [deckName, setDeckName] = useState(currentDeck?.name);
    const [description, setDescription] = useState(currentDeck?.description);
    const [imageUrl, setImageUrl] = useState(currentDeck?.img_url);
    const [changesMade, setChangesMade] = useState(false);
    const [showImgUrl, setShowImgUrl] = useState(false);

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
        setChangesMade(false)
        setShowImgUrl(false)
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
                    onChange={(e) => { setChangesMade(true); setDeckName(e.target.value) }}
                    readOnly={myDeck ? false : true}
                    required
                />
                <div>
                    {myDeck ? (<button onClick={handleClickOne}><i class="fa-regular fa-pen-to-square"></i></button>) : null}
                </div>
                <div className='save-changes'>{changesMade && myDeck ? (<button onClick={handleEdit}>Save changes</button>) : null}</div>
            </div>
            <div className='image-n-description'>
                <div>
                    <img
                    onClick={() => setShowImgUrl(!showImgUrl)}
                    style={{ maxHeight: '340px', maxWidth: '235px' }} src={currentDeck?.img_url} onError={(e) => e.target.src = defaultCard} />
                    {myDeck && (<div>Click Image to edit</div>)}
                    {showImgUrl && myDeck && (
                        <div><input
                            value={imageUrl}
                            onChange={(e) => { setChangesMade(true); setImageUrl(e.target.value) }}
                            /></div>)}
                </div>

                <div>
                    <label className='deck-label'>About this deck
                        <input
                            className='deck-description'
                            ref={refTwo}
                            value={description}
                            onChange={(e) => { setChangesMade(true); setDescription(e.target.value) }}
                            readOnly={myDeck ? false : true}
                            required
                        /></label>
                </div>
                <div>
                    {myDeck ? (<button onClick={handleClickTwo}><i class="fa-regular fa-pen-to-square"></i></button>) : null}
                </div>
            </div>
            <div>
                {myDeck ? (
                    <>
                        <button onClick={handleDelete}>Delete Deck</button>
                    </>) : null}
            </div>
            <div className='comment-container'>
                <CommentDisplay deck={currentDeck} />
            </div>
            <div>
                <DeckCards deck={currentDeck} />
            </div>
        </div>
    )
}

export default DeckDetail;
