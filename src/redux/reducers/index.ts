import { combineReducers } from "redux";

import items from "./items";
import gameState from "./game-state";
import score from "./score";
import timer from "./timer";
import level from "./level";

const reducer = combineReducers({
  items,
  gameState,
  score,
  timer,
  level
});

export default reducer;
