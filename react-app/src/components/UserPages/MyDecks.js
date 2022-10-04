import './MyDecks.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import defaultCard from '../../images/defaultCard.png'



const MyDecks = () => {

    const sessionUser = useSelector(state => state.session.user);
    const decks = useSelector(state => Object.values(state.decks));
    const myDecks = decks.filter(deck => deck.user_id == sessionUser.id)


    return (
        <div className='my-deck-container'>
            <div>
                <NavLink to='create-deck'>New Deck</NavLink>
            </div>
            <div className='inner-deck-container'>
                {myDecks.map(deck => {
                    return (
                        <>
                            <div>
                                <NavLink to={`/decks/${deck.id}`}>
                                <img className='preview-img'
                                src={deck.img_url}
                                onError={(e) => e.target.src = defaultCard} /></NavLink>
                                </div>
                            <div>{deck.name}</div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default MyDecks;
