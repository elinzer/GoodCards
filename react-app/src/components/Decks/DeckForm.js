import * as deckActions from '../../store/deck';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import './DeckForm.css';

const DeckForm = () => {
    const sessionUser = useSelector(state => state.session.user)
    const [name, setName] = useState('');
    const [coverImg, setCoverImg] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault()

        const deckData = {
            name,
            user_id: sessionUser.id,
            description,
            img_url: coverImg
        }

        dispatch(deckActions.createDeck(deckData));

        setName('');
        setCoverImg('');
        setDescription('');

        history.push('/my-decks')

    }

    return (
        <div className='outer-form-div'>
            <form onSubmit={handleSubmit}
                className='form-container'>
            <label>Deck Name
                <input
                    className='name-input'
                    placeholder='Deck Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                ></input>
            </label>
            <label>Cover Image Url
                <input
                    className='image-input'
                    placeholder='Image Url'
                    value={coverImg}
                    onChange={(e) => setCoverImg(e.target.value)}
                    required
                ></input>
            </label>
            <label>Description
                <textarea
                    className='description-input'
                    placeholder='Describe your deck...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </label>
            <button type='submit'>Create a deck</button>
            </form>
        </div>
    )
}

export default DeckForm;
