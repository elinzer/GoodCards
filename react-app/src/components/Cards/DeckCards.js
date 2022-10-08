import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import defaultCard from '../../images/defaultCard.png';
import './DeckCards.css';
import * as cardActions from '../../store/card';
import AddCards from "./AddCards";

const DeckCards = ({ deck }) => {

    const sessionUser = useSelector(state => state.session.user)
    const { id } = deck;
    const cardState = useSelector(state => state.cards)
    const cardList = Object.values(cardState)
    const dispatch = useDispatch()
    const deckCards = cardList.filter(card => {
        if (card.deck_ids.includes(id)) {
            return card;
        }
    })
    const [showAddCards, setShowAddCards] = useState(false);

    const removeCard = (deckId, cardId) => {
        const data = {
            card_id: cardId,
            deckId: deckId
        }

        dispatch(cardActions.removeCardFromDeck(data))
    }

    return (
        <div className="outer-deck-cards">
            <div>
                {sessionUser?.id == deck.user_id && (<button className="toggle-cards" onClick={() => setShowAddCards(!showAddCards)}>{showAddCards ? "Hide available cards" : "See cards available to add to your deck"}</button>)}
                {showAddCards && (<div><AddCards deck={deck} /></div>)}
            </div>
            <div><h3>Cards in Deck ({deckCards.length}):</h3></div>
            <ul className="deck-cards">
                {deckCards.map(card => {
                    return (
                        <li key={card.id} className='outer-card'>
                            {card.name}
                            <img
                                className="cards-in-deck"
                                src={card.img_url} onError={(e) => e.target.src = defaultCard} />
                            {deck.user_id == sessionUser?.id ? (<button className="remove-card" onClick={() => removeCard(deck.id, card.id)}>Remove Card</button>) : null}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default DeckCards;
