import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as commentActions from '../../store/comment'
import './EditComment.css'


const EditComment = () => {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams();
    const commentState = useSelector(state => state.comments);
    const comments = Object.values(commentState);
    const thisComment = comments.find(comment => comment.id == id)
    const [comment, setComment] = useState(thisComment.comment_body)
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const handleEdit = () => {
        setHasSubmitted(true);
        setErrors([]);
        if (!comment.length) {
            setErrors(['Comment cannot be empty'])
        } else {
            const commentData = {
                user_id: sessionUser.id,
                deck_id: thisComment.deck_id,
                comment_body: comment
            }

            dispatch(commentActions.editComment(commentData, id))
            history.push(`/decks/${thisComment.deck_id}`)
            setErrors([]);
            setHasSubmitted(false)
        }
    }

    const handleDelete = (e, commentId) => {
        dispatch(commentActions.deleteCommentById(commentId))
        history.push(`/decks/${thisComment.deck_id}`)
    }



    return (
        <div className="outer-edit-comment">
            <h4>Edit Comment</h4>
            {hasSubmitted && (<ul className='error-spot'>
                {errors.map((error, i ) => {
                    return (
                        <li key={i}>{error}</li>
                    )
                })}
            </ul>)}
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}

            />
            <button onClick={handleEdit}>Submit</button>
            <button onClick={(e) => handleDelete(e, thisComment.id)}><i class="fa-regular fa-trash-can" /></button>
        </div>
    )
}

export default EditComment;
