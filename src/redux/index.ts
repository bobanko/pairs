import { combineReducers } from "redux";

import items from "./items";
import isInGame from "./is-in-game";
import fieldSize from "./field-size";

const reducer = combineReducers({
  items,
  isInGame,
  fieldSize
});

export default reducer;
