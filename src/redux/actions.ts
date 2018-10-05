export const FLIP_CELL = "FLIP_CELL";
export const OPEN_CELL = "OPEN_CELL";
export const CLOSE_CELL = "CLOSE_CELL";
export const HIDE_CELL = "HIDE_CELL";
export const SHOW_CELL = "SHOW_CELL";

export const MATCH = "MATCH";

export const WIN = "WIN";
export const FAIL = "FAIL";

export const SET_SCORE = "SET_SCORE";
export const SET_LEVEL = "SET_LEVEL";

export const TIMER_START = "TIMER_START";
export const TIMER_TICK = "TIMER_TICK";
export const TIMER_STOP = "TIMER_STOP";

export const END_GAME = "END_GAME";
export const START_GAME = "START_GAME";

export const SET_ITEMS = "SET_ITEMS";

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

export const setItems = items => ({
  type: SET_ITEMS,
  items
});

export const setScore = value => ({
  type: SET_SCORE,
  value
});

export const timerStart = value => ({
  type: TIMER_START,
  value
});

export const timerTick = value => ({
  type: TIMER_TICK,
  value
});

export const timerStop = () => ({
  type: TIMER_STOP
});

export const startGame = () => ({
  type: START_GAME
});

export const endGame = () => ({
  type: END_GAME
});

export const setLevel = (value: number) => ({
  type: SET_LEVEL,
  value
});

export const winGame = (score: number = 0) => ({
  type: WIN,
  score
});

export const failGame = (score: number = 0) => ({
  type: FAIL,
  score
});
