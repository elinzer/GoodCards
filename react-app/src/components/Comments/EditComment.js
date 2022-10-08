import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as commentActions from '../../store/comment'
import './EditComment.css'


const EditComment = () => {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams();
    const commentState = useSelector(state => state.comments);
    const comments = Object.values(commentState);
    const thisComment = comments.find(comment => comment.id == id)
    const [comment, setComment] = useState(thisComment.comment_body)
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        let errs = [];
        if (!comment.length) errs.push('Comment cannot be empty')
        if (comment.length > 200) errs.push('Comment cannot be more than 200 characters long')
        if (errs.length) {
            setErrors(errs)
        } else {
            setErrors([])
        }
    }, [comment])

    const handleEdit = () => {
        setHasSubmitted(true);
        if (errors.length) {
            return
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
        <div className="comment-background">
            <div className="outer-edit-comment">
                <div className="inner-edit-comment">
                    <h4>Edit Comment</h4>
                    {hasSubmitted && (<div className='error-spot'>
                        {errors.map((error, i) => {
                            return (
                                <div key={i} style={{fontStyle: 'italic', color: 'red'}}>{error}</div>
                            )
                        })}
                    </div>)}
                    <textarea
                        className="comment-box"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}

                    />
                    <div className="edit-buttons">
                        <button className="submit-edit-button" onClick={handleEdit}>Save Changes</button>
                        <button className="delete-comment-button" onClick={(e) => handleDelete(e, thisComment.id)}>Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditComment;
