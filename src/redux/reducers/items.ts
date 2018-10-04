import {
  SET_ITEMS,
  OPEN_CELL,
  CLOSE_CELL,
  HIDE_CELL,
  SHOW_CELL
} from "../actions";

import { Item } from "../../types";

const reducer = (state: Array<Item> = [], action) => {
  switch (action.type) {
    case SET_ITEMS:
      return action.items;
    case OPEN_CELL:
    case CLOSE_CELL:
    case HIDE_CELL:
    case SHOW_CELL:
      return state.map(
        item => (item.id === action.id ? cell(item, action) : item)
      );
    default:
      return state;
  }
};

const cell = (state: Item, action) => {
  switch (action.type) {
    case OPEN_CELL:
      return { ...state, isOpen: true };
    case CLOSE_CELL:
      return { ...state, isOpen: false };
    case HIDE_CELL:
      return { ...state, isHidden: true };
    case SHOW_CELL:
      return { ...state, isHidden: false };
    default:
      return state;
  }
};

export default reducer;
