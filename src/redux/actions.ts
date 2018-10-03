export const FLIP_CELL = "FLIP_CELL";
export const OPEN_CELL = "OPEN_CELL";
export const CLOSE_CELL = "CLOSE_CELL";
export const HIDE_CELL = "HIDE_CELL";
export const SHOW_CELL = "SHOW_CELL";

export const MATCH = "MATCH";

export const WIN = "WIN";
export const FAIL = "FAIL";
export const SCORE = "SCORE";

export const END_GAME = "END_GAME";
export const START_GAME = "START_GAME";

export const GENERATE_ITEMS = "GENERATE_ITEMS";

export const flipCell = (id: number) => ({
  type: FLIP_CELL,
  id
});

export const openCell = (id: number) => ({
  type: OPEN_CELL,
  id
});

export const closeCell = (id: number) => ({
  type: CLOSE_CELL,
  id
});

export const hideCell = (id: number) => ({
  type: HIDE_CELL,
  id
});

export const showCell = (id: number) => ({
  type: SHOW_CELL,
  id
});

export const generateItems = fieldSize => ({
  type: GENERATE_ITEMS,
  fieldSize
});

export const winGame = () => ({
  type: WIN
});

export const failGame = () => ({
  type: FAIL
});
