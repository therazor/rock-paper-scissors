import React, { Component } from 'react';
import { default as play, PLAYER, MOVE } from './play/play'
import randomMove from './random-move/random-move'
import './App.css';

const MODE = {
  PLAYER_VS_COMPUTER: Symbol('PLAYER_VS_COMPUTER'),
  COMPUTER_VS_COMPUTER: Symbol('COMPUTER_VS_COMPUTER'),
}

const moveToStyle = {
  [MOVE.ROCK]: 'rock',
  [MOVE.PAPER]: 'paper',
  [MOVE.SCISSORS]: 'scissors',
}

const initialState = {
  roundInProgress: false,
  outcome: '',
  visualMoves: {
    [PLAYER.N1]: MOVE.ROCK,
    [PLAYER.N2]: MOVE.ROCK,
  }
};

const animationIterationsNeeded = 8;
let animationIterations = 0;

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

  // since the hand needs to go back and forth to simulate the game,
  // multiple events are fired. We need to count them to track when it finishes
  countHandIterations = () => {
    animationIterations++;

    if (animationIterations === animationIterationsNeeded) {
      animationIterations = 0;

      this.outcome()
    }
  }

  outcome = () => {
    const moves = {
      [PLAYER.N1]: randomMove(),
      [PLAYER.N2]: this.state.mode === MODE.PLAYER_VS_COMPUTER ? playerMove : randomMove(),
    }

    const { winner } = play(moves);
    let outcome;

    switch (winner) {
      case PLAYER.N1:
        outcome = 'Computer wins!';
        break;
      case PLAYER.N2:
        if (this.state.mode === MODE.COMPUTER_VS_COMPUTER)
          outcome = 'Computer 2 wins!';
        else
          outcome = 'You win!';
        break;
      default:
        outcome = 'Draw';
    }

    this.setState({
      outcome,
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

          <main role="main"
            className={this.state.roundInProgress ? 'start-game' : ''}
            onAnimationEnd={this.countHandIterations}>
            <div className="player player-1 computer">
              <div className="player-type">Computer</div>
              <div className={`hand ${moveToStyle[this.state.visualMoves[PLAYER.N1]]}`}></div>
            </div>

            <div className="player player-2">
              <div className="player-type human">You</div>
              <div className="player-type computer">Computer 2</div>
              <div className={`hand ${moveToStyle[this.state.visualMoves[PLAYER.N2]]}`}></div>
            </div>
          </main>
        </div>

        <ul className="action-picker">
          <li>
            <button className="pick-action ir rock"
              disabled={this.state.roundInProgress}
              onClick={() => this.playerPicked(MOVE.ROCK)}>Rock</button>
          </li>
          <li>
            <button className="pick-action ir paper"
              disabled={this.state.roundInProgress}
              onClick={() => this.playerPicked(MOVE.PAPER)}>Paper</button>
          </li>
          <li>
            <button className="pick-action ir scissors"
              disabled={this.state.roundInProgress}
              onClick={() => this.playerPicked(MOVE.SCISSORS)}>Scissors</button>
          </li>
        </ul>

        <div className={`outcome ${this.state.outcome ? 'game-complete' : ''}`}
          onAnimationEnd={this.reset}>
          <span>{this.state.outcome}</span>
        </div>
      </div>
    );
  }
}

export default App;
