import { NavLink, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as commentActions from '../../store/comment';
import './CommentDisplay.css'

const CommentDisplay = ({ deck }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const commentState = useSelector(state => state.comments)
    const allComments = Object.values(commentState)
    const deckComments = allComments.filter(comment => {
        return comment.deck_id == deck.id
    })
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)


    const handlePost = () => {
        setHasSubmitted(true);
        setErrors([]);
        if (!comment.length) {
            setErrors(['Comment cannot be empty'])
        } else {
            const commentData = {
                user_id: sessionUser.id,
                deck_id: deck.id,
                comment_body: comment
            }

            dispatch(commentActions.createComment(commentData));
            setComment('');
            setErrors([]);
            setHasSubmitted(false)
        }

    }


    return (
        <div className='comments-container'>
            <h4>Comments</h4>
            {hasSubmitted && (<ul className='error-spot'>
                {errors.map((error, i ) => {
                    return (
                        <li key={i}>{error}</li>
                    )
                })}
            </ul>)}
            {sessionUser && (<div className='post-comment'>
                <textarea
                    placeholder='Write a comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}

                />
                <button onClick={handlePost}>Post Comment</button>
            </div>)}
            <ul>
                {deckComments?.map(comment => {
                    return (
                        <li key={comment?.id}>
                            {comment.comment_body}
                            {comment.user_id == sessionUser?.id ? (<>
                                <NavLink to={`/edit-comment/${comment.id}`}><button>edit</button></NavLink>
                            </>) : null}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CommentDisplay;
