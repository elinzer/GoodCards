import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import defaultCard from '../../images/defaultCard.png';
import * as deckActions from '../../store/deck';
import './DeckDetail.css'
import CommentDisplay from '../Comments/CommentDisplay';
import DeckCards from '../Cards/DeckCards';
import FourOhFour from '../FoF';

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
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let errs = [];

        if (!deckName?.length) errs.push("Deck name can't be blank")
        if (deckName?.length > 25) errs.push("Deck name can't be greater than 25 characters")
        if (!description?.length) errs.push("Description can't be blank")
        if (description?.length > 200) errs.push('Deck description must be less than 200 characters long')
        if (!(imageUrl?.endsWith('.jpg') || imageUrl?.endsWith('png') || imageUrl?.endsWith('.jpeg'))) errs.push('Image url must end with .png/.jpeg/.jpg')
        if (!imageUrl?.length) errs.push("Image url can't be blank")
        if (errs.length) {
            setErrors(errs)
        } else {
            setErrors([])
        }

    }, [imageUrl, description, deckName])

    if (!currentDeck) {
        return (
            <FourOhFour />
        )
    }

    const handleDelete = () => {
        dispatch(deckActions.deleteDeckById(currentDeck?.id))
        history.push('/my-decks')
    }

    const handleEdit = () => {

        setHasSubmitted(true);

        if (errors.length) {
            return
        } else {
            const editInfo = {
                name: deckName,
                user_id: sessionUser.id,
                description: description,
                img_url: imageUrl
            }

            dispatch(deckActions.editDeck(editInfo, currentDeck?.id))
            setChangesMade(false)
            setShowImgUrl(false)
            setHasSubmitted(false)
        }

    }

    const handleClickOne = () => {
        refOne.current.focus()
    }

    const handleClickTwo = () => {
        refTwo.current.focus()
    }

    return (
        <div className='detail-container'>
            <div className='inner-detail'>
                <div className='outer-image-n-description'>
                    <div className='inner-img-n-desc'>
                        <div className='img-n-edit'>
                            <img className='cover-img'
                                onClick={() => setShowImgUrl(!showImgUrl)}
                                style={{ maxHeight: '340px', maxWidth: '235px', cursor: `${myDeck ? 'pointer' : null}` }} src={currentDeck?.img_url} onError={(e) => e.target.src = defaultCard} />
                            {myDeck && (<div className='click-cover'>click cover image to edit</div>)}
                            {showImgUrl && myDeck && (
                                <div><input
                                    className='url-input'
                                    value={imageUrl}
                                    onChange={(e) => { setChangesMade(true); setImageUrl(e.target.value) }}
                                /></div>)}
                        </div>
                    </div>

                    <div className='outer-desc'>
                        <div className='deck-name-container'>
                            <input
                                className='deck-name'
                                ref={refOne}
                                value={deckName}
                                onChange={(e) => { setChangesMade(true); setDeckName(e.target.value) }}
                                readOnly={myDeck ? false : true}
                                required
                            />
                            <div>
                                {myDeck ? (<button className="edit-but" onClick={handleClickOne}><i className="fa-regular fa-pen-to-square"></i></button>) : null}
                            </div>
                        </div>
                        <div className='mid-desc'>
                            <label className='deck-label'>About this deck</label>
                            <div className='inner-desc'>
                                <textarea
                                    className='deck-description'
                                    ref={refTwo}
                                    value={description}
                                    onChange={(e) => { setChangesMade(true); setDescription(e.target.value) }}
                                    readOnly={myDeck ? false : true}
                                    required
                                />
                                {myDeck ? (<button className="edit-but" onClick={handleClickTwo}><i className=" fa-regular fa-pen-to-square"></i></button>) : null}
                            </div>
                        </div>
                        <div className='edit-n-delete'>
                            <div>
                                {myDeck ? (<button className='delete-but' onClick={handleDelete}>Delete Deck</button>) : null}
                            </div>
                            <div className='save-changes'>
                                <button
                                    onClick={handleEdit}
                                    className={changesMade && myDeck ? "visible-save" : "invisible-save"}>
                                    Save changes
                                </button>
                            </div>
                            <div>
                                {myDeck && hasSubmitted && (
                                    <div className='error-list'>
                                        {errors.map((error, ind) => {
                                            return (
                                                <div key={ind}>{error}</div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='comment-container'>
                    <CommentDisplay deck={currentDeck} />
                </div>
                <div>
                    <DeckCards deck={currentDeck} />
                </div>
            </div>
        </div>
    )
}

export default DeckDetail;
