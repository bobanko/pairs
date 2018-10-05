import { END_GAME, START_GAME, WIN, FAIL } from "../actions";
import { GameState } from "../../types";

const reducer = (state: GameState = GameState.INITIAL, action) => {
  switch (action.type) {
    case START_GAME:
      return GameState.PLAY;
    case WIN:
      return GameState.WIN;
    case FAIL:
      return GameState.FAIL;
    case END_GAME:
      return GameState.END;
    default:
      return state;
  }
};

export default reducer;
