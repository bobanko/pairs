export const FLIP_CELL = "FLIP_CELL";
export const OPEN_CELL = "OPEN_CELL";
export const CLOSE_CELL = "CLOSE_CELL";
export const MATCH = "MATCH";
export const WIN = "WIN";
export const FAIL = "FAIL";
export const SCORE = "SCORE";
export const END_GAME = "END_GAME";
export const START_GAME = "START_GAME";
export const GENERATE_ITEMS = "GENERATE_ITEMS";

export const openCell = params => ({
  type: OPEN_CELL,
  params
});

export const flipCell = id => ({
  type: FLIP_CELL,
  id
});

export const generateItems = fieldSize => ({
  type: GENERATE_ITEMS,
  fieldSize
});
