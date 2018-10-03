import { FLIP_CELL, OPEN_CELL, START_GAME, GENERATE_ITEMS } from "./actions";

import { generateItems } from "../components/index";
import { Item } from "../types";

const reducer = (state: Array<Item> = [], action) => {
  switch (action.type) {
    case GENERATE_ITEMS:
      return generateItems(action.fieldSize);
    case FLIP_CELL:
      let newstate = state.map(
        item => (item.id === action.id ? cell(item, action) : item)
      );
      console.log(newstate);
      return newstate;
    default:
      return state;
  }
};

const cell = (state: Item, action) => {
  switch (action.type) {
    case FLIP_CELL: {
      return { ...state, isOpen: !state.isOpen };
    }
    default:
      return state;
  }
};

export default reducer;
