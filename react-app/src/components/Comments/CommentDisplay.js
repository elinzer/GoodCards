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
        } else if (comment.length > 200) {
            setErrors(['Comment cannot be greater than 200 characters'])
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
                    className='comment-input'
                    placeholder='Write a comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}

                />
                <button onClick={handlePost}>Post Comment</button>
            </div>)}
            <ul className='comments-list'>
                {deckComments?.map(comment => {
                    return (
                        <li key={comment?.id} className='single-comment'>
                            {comment.comment_body}
                            {comment.user_id == sessionUser?.id ? (<>
                                <NavLink className='navLink' to={`/edit-comment/${comment.id}`}><span>edit</span></NavLink>
                            </>) : null}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CommentDisplay;
