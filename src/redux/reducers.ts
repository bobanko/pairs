import { START_GAME, OPEN_CELL, END_GAME } from "./actions";

const reducer = (
  state = {
    isInGame: false,
    cells: []
  },
  action
) => {
  switch (action.type) {
    case START_GAME:
      return { ...state, isInGame: true };
    case OPEN_CELL:
      return { ...state, cells: [...state.cells, null] };
    case END_GAME:
      return { ...state, isInGame: false };
    default:
      return state;
  }
};

export default reducer;
