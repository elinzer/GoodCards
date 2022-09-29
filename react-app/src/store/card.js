//types
const GET_ALL = 'cards/GET_ALL'


//actions
const getAll = (cards) => ({
    type: GET_ALL,
    payload: cards
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


//reducer
export default function cardReducer(state = {}, action) {
    let newState = { ...state };
    switch (action.type) {
      case GET_ALL:
        action.payload.cards.forEach((card) => {
          newState[card.id] = card;
        });
        return newState;
      default:
        return state;
    }
  }
