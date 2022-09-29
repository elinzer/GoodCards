import * as cardActions from '../../store/card'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './Cards.css'
import defaultImg from '../../images/defaultCard.png'

const Cards = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cardActions.getCards());
    }, [dispatch]);

    const cardState = useSelector(state => state.cards)
    const cards = Object.values(cardState)

    return (
        <div>
            <h1>All Cards</h1>
            <ul className='card-container'>
                {cards.map(card => {
                    return (
                        <li key={card.id}><img src={card.img_url} onError={(e) => e.target.src = defaultImg} /></li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Cards;
