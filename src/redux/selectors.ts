import { State } from "../types";

export const getItems = (state: State) => state.items;

export const getItemsCount = (state: State) => state.items.length;

export const getHiddenItemsCount = (state: State) =>
  state.items.filter(i => i.isHidden).length;

export const getScore = (state: State) => state.score;

export const getGameState = (state: State) => state.gameState;

export const getItemById = (id: number) => (state: State) =>
  state.items.find(item => item.id === id);
