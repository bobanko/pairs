import { SET_SCORE } from "../actions";

const reducer = (state = 0, action) => {
  switch (action.type) {
    case SET_SCORE:
      return action.value;
    default:
      return state;
  }
};

export default reducer;
