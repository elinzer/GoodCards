import * as deckActions from '../../store/deck';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Decks = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(deckActions.getDecks())
    }, [dispatch])

    const deckState = useSelector(state => state.decks)
    const decks = Object.values(deckState)


    return (
        <div>
            <h1> All Decks</h1>
            <ul>
                {decks.map(deck => {
                    console.log(deck)
                    return (
                        <div>
                            <li key={deck.id}>{deck.name}, {deck.description}</li>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default Decks;
