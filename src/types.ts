export type Item = {
  id: number;
  imageId: number;
  isOpen: boolean;
  isHidden: boolean;
};

export enum GameState {
  "WIN",
  "FAIL",
  "PLAY"
}

export type State = {
  items: Array<Item>;
  gameState: GameState;
  level: number;
  timer: number;
  fieldSize: { width: number; height: number };
  score: number;
};
