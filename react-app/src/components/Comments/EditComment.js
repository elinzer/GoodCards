import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as commentActions from '../../store/comment'


const EditComment = () => {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams();
    const commentState = useSelector(state => state.comments);
    const comments = Object.values(commentState);
    const thisComment = comments.find(comment => comment.id == id)
    const [comment, setComment] = useState(thisComment.comment_body)

    const handleEdit = () => {
        const commentData = {
            user_id: sessionUser.id,
            deck_id: thisComment.deck_id,
            comment_body: comment
        }

        dispatch(commentActions.editComment(commentData, id))
        history.push(`/decks/${thisComment.deck_id}`)
    }




    return (
        <div>
            <h4>Edit Comment</h4>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}

            />
            <button onClick={handleEdit}>Submit</button>
        </div>
    )
}

export default EditComment;
