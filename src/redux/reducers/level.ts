import { SET_LEVEL } from "../actions";

const reducer = (state = 1, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return action.value;
    default:
      return state;
  }
};

export default reducer;
