import * as deckActions from '../../store/deck';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import DeckForm from './DeckForm';
import './Decks.css'
import defaultImg from '../../images/defaultCard.png'

const Decks = () => {
    const sessionUser = useSelector(state => state.session.user)
    // const dispatch = useDispatch()
    const deckState = useSelector(state => state.decks)
    const decks = Object.values(deckState)

    return (
        <div>
            <h2> Check out some of these decks:</h2>
            <ul className='deck-list'>
                {decks.map(deck => {
                    return (
                        <div className='deck-preview'>
                            <li key={deck.id}>
                            <NavLink to={`/decks/${deck.id}`}><img className='preview-img' src={deck.img_url} onError={(e) => e.target.src = defaultImg}/></NavLink>
                                {deck.name}</li>
                        </div>
                    )
                })}
            </ul>
            {/* <div>
               {sessionUser && (<DeckForm />)}
            </div> */}
        </div>
    )
}

export default Decks;
