import * as React from "react";
import { connect } from "react-redux";

import Field from "./field";

import "./index.scss";
import { Item, State, GameState } from "../types";
import { startGame } from "../redux/actions";

type Props = {
  items: Array<Item>;
  level: number;
  timer: number;
  gameState: GameState;

  startGame: () => void;
};

class App extends React.Component<Props> {
  render() {
    const { gameState } = this.props;

    return (
      <>
        <div className="level">level {this.props.level}</div>
        <div className="game-state">
          {gameState === GameState.PLAY && `⏱️${this.props.timer}`}
          {gameState === GameState.WIN && "👑you won✊"}
          {gameState === GameState.FAIL && "💀you failed😰"}
        </div>

        <Field items={this.props.items} />
        {gameState !== GameState.PLAY && (
          <div className="play-button" onClick={() => this.props.startGame()}>
            Start
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: State) => {
  const { items, timer, gameState, level } = state;

  return {
    items,
    timer,
    level,
    gameState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => dispatch(startGame())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
