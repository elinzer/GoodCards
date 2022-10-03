//types
const GET_ALL = 'cards/GET_ALL'
const ADD_CARD = 'cards/ADD_CARD'
const REMOVE_CARD = 'cards/REMOVE_CARD'

//actions
const getAll = (cards) => ({
  type: GET_ALL,
  payload: cards
})

const add = (deck) => ({
  type: ADD_CARD,
  payload: deck
})

const remove = (deck) => ({
  type: REMOVE_CARD,
  payload: deck
})

//thunks
//get all
export const getCards = () => async (dispatch) => {
  const res = await fetch("/api/cards/");
  if (res.ok) {
    const cards = await res.json();
    dispatch(getAll(cards));
  }
  return res;
};

//add card to deck
export const addCardToDeck = (cardData) => async (dispatch) => {
  const {card_id} = cardData;
  const res = await fetch(`/api/cards/${card_id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cardData)
  });
  if (res.ok) {
    const card = await res.json();
    dispatch(add(card));
    return card;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
  return res;
}

export const removeCardFromDeck = (cardData) => async (dispatch) => {
  const {card_id} = cardData;
  const res = await fetch(`/api/cards/${card_id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cardData)
  });
  if (res.ok) {
    const card = await res.json();
    dispatch(remove(card));
    return card;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
  return res;
}


//reducer
export default function cardReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL:
      action.payload.cards.forEach((card) => {
        newState[card.id] = card;
      });
      return newState;
    case ADD_CARD:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
}
