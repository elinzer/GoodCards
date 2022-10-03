//types
const GET_ALL = "decks/GET_ALL";
const GET_CURRENT = "decks/GET_CURRENT";
const CREATE = "decks/CREATE";
const UPDATE = "decks/UPDATE";
const DELETE = "decks/DELETE";

//actions
const getAll = (decks) => ({
  type: GET_ALL,
  payload: decks,
});

const getCurrentDecks = (decks) => ({
  type: GET_CURRENT,
  payload: decks,
});

const create = (deck) => ({
  type: CREATE,
  payload: deck,
});

const update = (deck) => ({
  type: UPDATE,
  payload: deck,
});

const deleteOne = (deckId) => ({
  type: DELETE,
  payload: deckId,
});

//thunks
//get all
export const getDecks = () => async (dispatch) => {
  const res = await fetch("/api/decks/");
  if (res.ok) {
    const decks = await res.json();
    dispatch(getAll(decks));
  }
  return res;
};

//get decks by current user
export const userDecks = () => async (dispatch) => {
  const res = await fetch(`/api/decks/current/`);
  if (res.ok) {
    const decks = await res.json();
    dispatch(getCurrentDecks(decks));
  }
  return res;
};

//create deck
export const createDeck = (deck) => async (dispatch) => {
  const res = await fetch("/api/decks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deck),
  });
  if (res.ok) {
    const deck = await res.json();
    dispatch(create(deck));
    return deck;
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

//edit deck
export const editDeck = (deck, id) => async (dispatch) => {
  const res = await fetch(`/api/decks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deck),
  });
  if (res.ok) {
    const deck = await res.json();
    dispatch(update(deck));
    return deck;
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

//delete deck
export const deleteDeckById = (id) => async (dispatch) => {
  const res = await fetch(`/api/decks/${id}`, {
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
export default function deckReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL:
      action.payload.decks.forEach((deck) => {
        newState[deck.id] = deck;
      });
      return newState;
    case GET_CURRENT:
      action.payload.decks.forEach((deck) => {
        newState[deck.id] = deck;
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
