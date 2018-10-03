import { END_GAME, START_GAME, WIN, FAIL } from "./actions";

const reducer = (state = false, action) => {
  switch (action.type) {
    case START_GAME:
      return true;
    case END_GAME:
    case WIN:
    case FAIL:
      return false;
    default:
      return state;
  }
};

export default reducer;
