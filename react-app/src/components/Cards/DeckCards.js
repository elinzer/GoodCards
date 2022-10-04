import { useSelector } from "react-redux";
import defaultCard from '../../images/defaultCard.png'
import './DeckCards.css'

const DeckCards = ({ deck }) => {

    const { id } = deck;
    const cardState = useSelector(state => state.cards)
    const cardList = Object.values(cardState)

    const deckCards = cardList.filter(card => {
        if (card.deck_ids.includes(id)) {
            return card;
        }
    })

    return (
        <div>
            <ul className="deck-cards">
                {deckCards.map(card => {
                    return (
                        <li key={card.id}>
                            <img
                                className="card-img"
                                src={card.img_url} onError={(e) => e.target.src = defaultCard}/></li>
                    )
                })}
            </ul>
        </div>
    )
}

export default DeckCards;
