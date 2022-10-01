//types
const GET_ALL = "comments/GET_ALL";
const GET_CURRENT = "comments/GET_CURRENT";
const CREATE = "comments/CREATE";
const UPDATE = "comments/UPDATE";
const DELETE = "comments/DELETE";

//actions
const getAll = (comments) => ({
    type: GET_ALL,
    payload: comments,
});

const getCurrentComments = (comments) => ({
    type: GET_CURRENT,
    payload: comments,
});

const create = (comment) => ({
    type: CREATE,
    payload: comment,
});

const update = (comment) => ({
    type: UPDATE,
    payload: comment,
});

const deleteOne = (commentId) => ({
    type: DELETE,
    payload: commentId,
});

//thunks
//get all
export const getComments = () => async (dispatch) => {
    const res = await fetch("/api/comments/");
    if (res.ok) {
      const comments = await res.json();
      dispatch(getAll(comments));
    }
    return res;
  };

//get comments by current user
export const userComments = () => async (dispatch) => {
    const res = await fetch(`/api/comments/current/`);
    if (res.ok) {
      const comments = await res.json();
      dispatch(getCurrentComments(comments));
    }
    return res;
  };

//create comment
export const createComment = (comment) => async (dispatch) => {
    const res = await fetch("/api/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (res.ok) {
      const comment = await res.json();
      dispatch(create(comment));
      return comment;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
    return res;
  };

//edit comment
export const editComment = (comment, id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (res.ok) {
      const comment = await res.json();
      dispatch(update(comment));
      return comment;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
    return res;
  };

//delete comment
export const deleteCommentById = (id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      dispatch(deleteOne(id));
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
    return res;
  };


//reducer
export default function commentReducer(state = {}, action) {
    let newState = { ...state };
    switch (action.type) {
      case GET_ALL:
        action.payload.comments.forEach((comment) => {
          newState[comment.id] = comment;
        });
        return newState;
      case GET_CURRENT:
        action.payload.comments.forEach((comment) => {
          newState[comment.id] = comment;
        });
        return newState;
      case CREATE:
        newState[action.payload.id] = action.payload;
        return newState;
      case UPDATE:
        newState[action.payload.id] = action.payload;
        return newState;
      case DELETE:
        delete newState[action.payload];
        return newState;
      default:
        return state;
    }
  }
