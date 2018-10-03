import { END_GAME, START_GAME } from "./actions";

const reducer = (state = { width: 4, height: 4 }, action) => {
  switch (action.type) {
    case START_GAME:
      return { width: 4, height: 4 };
    // case END_GAME:
    //   return { width: 4, height: 4};
    default:
      return state;
  }
};

export default reducer;
