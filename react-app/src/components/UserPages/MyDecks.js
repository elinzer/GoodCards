import './MyDecks.css';
import { useSelector } from 'react-redux';



const MyDecks = () => {

    const sessionUser = useSelector(state => state.session.user);
    const decks = useSelector(state => Object.values(state.decks));
    const myDecks = decks.filter(deck => deck.user_id == sessionUser.id)


    return (
        <div className='my-deck-container'>
            <ul>
                {myDecks.map(deck => {
                    return (
                        <>
                            <li><img src={deck.img_url} /></li>
                            <li>{deck.name}</li>
                        </>
                    )
                })}
            </ul>
        </div>
    )
}

export default MyDecks;
