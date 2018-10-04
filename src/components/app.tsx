import * as React from "react";
import { connect } from "react-redux";

import Field from "./field";

import "./index.scss";
import { Item, State, GameState } from "../types";

type Props = {
  items: Array<Item>;
  timer: number;
  gameState: GameState;
};

class App extends React.Component<Props> {
  render() {
    const { gameState } = this.props;

    return (
      <>
        <div className="game-state">
          {gameState === GameState.PLAY && this.props.timer}
          {gameState === GameState.WIN && "👑 you won ✊"}
          {gameState === GameState.FAIL && "you failed 😰"}
        </div>

        <Field items={this.props.items} />
        <div className="controls" />
      </>
    );
  }
}

const mapStateToProps = (state: State) => {
  const { items, timer, gameState } = state;

  return {
    items,
    timer,
    gameState
  };
};

export default connect(mapStateToProps)(App);
