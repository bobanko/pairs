export type Item = {
  id: number;
  imageId: number;
  isOpen: boolean;
  isHidden: boolean;
};

export enum GameState {
  "INITIAL",
  "WIN",
  "FAIL",
  "PLAY",
  "END"
}

export type State = {
  items: Array<Item>;
  gameState: GameState;
  level: number;
  timer: number;
  fieldSize: { width: number; height: number };
  score: number;
};
