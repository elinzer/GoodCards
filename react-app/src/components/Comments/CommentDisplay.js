import { useParams } from 'react-router-dom';
import * as commentActions from '../../store/comment'

const CommentDisplay = ({decks}) => {
    const { id } = useParams()
    const deckList = Object.values(decks);
    let currentDeck = deckList?.find(deck => deck.id == id);

    //comment useState stuff here


    return (
        <div>
            <h4>Comments</h4>
            <textarea
                placeholder='Write a comment'

            />
            <button>Post Comment</button>
            <ul>
                {currentDeck?.comments.map(comment => {
                    return (
                        <li>{comment.comment_body}, posted on {comment.created_at}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CommentDisplay;
