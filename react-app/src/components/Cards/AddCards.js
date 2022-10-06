import './AddCards.css';
import { useSelector, useDispatch} from 'react-redux';
import defaultCard from '../../images/defaultCard.png'
import * as cardActions from '../../store/card'

const AddCards = ({ deck }) => {

    const { card_ids } = deck;
    const dispatch = useDispatch();
    const cardState = useSelector(state => state.cards);
    const cardList = Object.values(cardState);
    const cardsInDeck = cardList.filter(card => {
        if (!card.deck_ids.includes(deck.id)) {
            return card
        }
    })

    const addCards = (deckId, cardId) => {
        const data = {
            card_id: cardId,
            deckId: deckId
        }

        dispatch(cardActions.addCardToDeck(data))
    }

    return (
        <div className="outer-add-cards">
            <ul className="deck-cards">
                {cardsInDeck.map(card => {
                    return (
                        <li key={card.id} className='outer-card'>
                            {card.name}
                            <img
                                className="cards-in-deck"
                                src={card.img_url} onError={(e) => e.target.src = defaultCard} />
                                <button onClick={() => addCards(deck.id, card.id)}>Add Card</button></li>
                    )
                })}
            </ul>
        </div>
    )
}

export default AddCards;
