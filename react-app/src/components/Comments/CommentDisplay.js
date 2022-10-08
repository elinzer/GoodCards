import { NavLink, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as commentActions from '../../store/comment';
import './CommentDisplay.css'
import { useEffect } from 'react';

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


    useEffect(() => {
        let errs = [];
        if (!comment.length) errs.push('Comment cannot be empty')
        if (comment.length > 200) errs.push('Comment cannot be greater than 200 characters')
        if (errs.length) {
            setErrors(errs)
        } else {
            setErrors([]);
        }

    }, [comment])


    const handlePost = () => {
        setHasSubmitted(true);
        if (errors.length) {
            return
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
                {errors.map((error, i) => {
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
                <button className='post-button' onClick={handlePost}>Post Comment</button>
            </div>)}
            <div className='comments-list'>
                {deckComments?.map(comment => {
                    let createdAt = new Date(comment.created_at)
                    return (
                        <div key={comment?.id} className='single-comment'>
                            <div className='comment-body'>{comment.comment_body}</div>
                            <div className='comment-time'>posted on {createdAt.toDateString()}</div>
                            {comment.user_id == sessionUser?.id ? (<>
                                <NavLink className='navLink' to={`/edit-comment/${comment.id}`}><span>edit</span></NavLink>
                            </>) : null}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default CommentDisplay;
