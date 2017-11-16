import React, { Component } from 'react';
import ActionPicker from './action-picker/ActionPicker'
import Hands from './hands/Hands'
import Result from './result/Result'

import { default as play, PLAYER, MOVE } from './play/play'
import randomMove from './random-move/random-move'
import './App.css';

export const MODE = {
  PLAYER_VS_COMPUTER: Symbol('PLAYER_VS_COMPUTER'),
  COMPUTER_VS_COMPUTER: Symbol('COMPUTER_VS_COMPUTER'),
}

const initialState = {
  winner: null,
  roundInProgress: false,
  outcome: '',
  visualMoves: {
    [PLAYER.N1]: MOVE.ROCK,
    [PLAYER.N2]: MOVE.ROCK,
  }
};

let playerMove;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
      mode: MODE.PLAYER_VS_COMPUTER,
    }, initialState);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.roundInProgress &&
      !this.state.roundInProgress &&
      this.state.mode === MODE.COMPUTER_VS_COMPUTER
    ) {
      // wait a short while before next round
      setTimeout(this.startComputer, 100);
    }
  }

  reset = () => {
    this.setState(initialState);
  }

  modePicked = mode => {
    this.setState({
      mode,
    });

    this.reset();

    if (mode === MODE.COMPUTER_VS_COMPUTER) {
      this.startComputer()
    }
  }

  startComputer = () => {
    this.setState({
      roundInProgress: true,
    });
  }

  playerPicked = move => {
    playerMove = move;

    this.setState({
      roundInProgress: true,
    });
  }

  outcome = () => {
    const moves = {
      [PLAYER.N1]: randomMove(),
      [PLAYER.N2]: this.state.mode === MODE.PLAYER_VS_COMPUTER ? playerMove : randomMove(),
    }

    const { winner } = play(moves);

    this.setState({
      winner,
      visualMoves: moves
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <header>
            <ul>
              <li>
                <button className="pick-player-type computer"
                  onClick={() => this.modePicked(MODE.COMPUTER_VS_COMPUTER)}
                  disabled={this.state.mode === MODE.COMPUTER_VS_COMPUTER}>Computer</button>
              </li>
              <li>
                <button className="pick-player-type human"
                  onClick={() => this.modePicked(MODE.PLAYER_VS_COMPUTER)}
                  disabled={this.state.mode === MODE.PLAYER_VS_COMPUTER}>Human</button>
              </li>
            </ul>
          </header>

          <Hands
            gameMode={this.state.mode}
            showAnimation={this.state.roundInProgress}
            animationComplete={this.outcome}
            playerMoves={this.state.visualMoves} />
        </div>

        <ActionPicker
          buttonsEnabled={this.state.roundInProgress}
          clickCallback={this.playerPicked} />

        <Result
          winner={this.state.winner}
          gameMode={this.state.mode}
          animationComplete={this.reset} />
      </div>
    );
  }
}

export default App;
