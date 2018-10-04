import { END_GAME, START_GAME, WIN, FAIL } from "../actions";
import { GameState } from "../../types";

const reducer = (state = false, action) => {
  switch (action.type) {
    case START_GAME:
      return GameState.PLAY;
    case WIN:
      return GameState.WIN;
    case FAIL:
      return GameState.FAIL;
    case END_GAME:
    default:
      return state;
  }
};

export default reducer;
