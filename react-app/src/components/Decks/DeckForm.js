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
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let errs = [];
        if (!(coverImg.endsWith('.jpg') || coverImg.endsWith('png') || coverImg.endsWith('.jpeg'))) {
            errs.push('Image url must end with .png/.jpeg/.jpg')
        }
        if (description.length < 10) {
            errs.push('Deck description must be at least 10 characters long')
        }
        if (description.length > 200) {
            errs.push('Deck description must be less than 200 characters long')
        }
        if (name.length > 25) {
            errs.push('Deck name cannot be greater than 25 characters')
        }
        if (errs.length) {
            setErrors(errs)
        } else {
            setErrors([])
        }
    },[coverImg, description, name])

    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (errors.length) {
            return
        } else {
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
            setErrors([]);
            setHasSubmitted(false);

            history.push('/my-decks')
        }


    }

    return (
        <div className='background'>
            <div className='outer-form-div'>
                <form onSubmit={handleSubmit}
                    className='form-container'>
                    {hasSubmitted && (<ul className='create-errors'>
                        {errors.map((error, i) => {
                            return (
                                <li key={i}>{error}</li>
                            )
                        })}
                    </ul>)}
                    <label className='deck-label'>Deck Name:
                        <input
                            className='name-input'
                            placeholder='Deck Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        ></input>
                    </label>
                    <label className='image-label'>Cover Image Url:
                        <input
                            className='image-input'
                            placeholder='Image Url'
                            value={coverImg}
                            onChange={(e) => setCoverImg(e.target.value)}
                            required
                        ></input>
                    </label>
                    <label className='desc-label'>Description:
                        <textarea
                            className='description-input'
                            placeholder='Describe your deck...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </label>
                    <button className='create-button' type='submit'>Create a deck</button>
                </form>
            </div>
        </div>
    )
}

export default DeckForm;
