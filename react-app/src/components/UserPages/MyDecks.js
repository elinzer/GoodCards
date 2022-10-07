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
            <div className='new-deck-link'>
                <h2 style={{fontWeight: 'bold'}}>My Decks</h2>
                <NavLink to='create-deck'><button className='new-deck-butt'>New Deck</button></NavLink>
            </div>
            <div className='inner-deck-container'>
                <table>
                    <tr>
                        <th>Cover</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date Added</th>
                    </tr>
                    {myDecks.map(deck => {
                        let createdAt = new Date(deck.created_at)
                        return (
                            <>
                                <tr>
                                    <td className='img-box'><NavLink to={`/decks/${deck.id}`}>
                                        <img className='cover-img'
                                            src={deck.img_url}
                                            onError={(e) => e.target.src = defaultCard} /></NavLink></td>
                                <td className='name-box' >{deck.name}</td>
                                <td className='desc-box'>{deck.description}</td>
                                <td className='time-box'>{createdAt.toDateString()}</td>
                                </tr>
                            </>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default MyDecks;
