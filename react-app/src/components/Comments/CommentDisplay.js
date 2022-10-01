import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as commentActions from '../../store/comment'

const CommentDisplay = ({deck}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const commentState = useSelector(state => state.comments)
    const allComments = Object.values(commentState)
    const deckComments = allComments.filter(comment => {
        return comment.deck_id == deck.id
    })

    const [comment, setComment] = useState('');

    const handlePost = () => {
        const commentData = {
            user_id: sessionUser.id,
            deck_id: deck.id,
            comment_body: comment
        }

        dispatch(commentActions.createComment(commentData));
        setComment('')
    }

    const handleDelete = (e, commentId) => {
        dispatch(commentActions.deleteCommentById(commentId))
    }



    return (
        <div>
            <h4>Comments</h4>
            <textarea
                placeholder='Write a comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}

            />
            <button onClick={handlePost}>Post Comment</button>
            <ul>
                {deckComments.map(comment => {
                    return (
                        <li key={comment.id}>{comment.comment_body}, posted on {comment.created_at}{comment.user_id == sessionUser.id ? (<><button><i class="fa-regular fa-pen-to-square" /></button><button onClick={(e) => handleDelete(e, comment.id)}><i class="fa-regular fa-trash-can" /></button></>) : null}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CommentDisplay;
