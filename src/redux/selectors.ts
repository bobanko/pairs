import { State } from ".";

export const getItems = (state: State) => state.items;

export const getItemById = (id: number) => (state: State) =>
  state.items.find(item => item.id === id);
