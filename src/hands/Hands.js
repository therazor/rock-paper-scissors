import React from 'react';
import { MOVE, PLAYER } from '../play/play'
import { MODE } from '../App';

const moveToStyle = {
  [MOVE.ROCK]: 'rock',
  [MOVE.PAPER]: 'paper',
  [MOVE.SCISSORS]: 'scissors',
}

const ActionPicker = ({ showAnimation, gameMode, animationComplete, playerMoves }) => {
  const animationIterationsNeeded = 8;
  let animationIterations = 0;
  
  // since the hand needs to go back and forth to simulate the game,
  // multiple events are fired. We need to count them to track when it finishes
  const countHandIterations = () => {
    animationIterations++;

    if (animationIterations === animationIterationsNeeded) {
      animationIterations = 0;

      animationComplete()
    }
  }

  return (
    <main role="main"
      className={showAnimation ? 'start-game' : ''}
      onAnimationEnd={countHandIterations}>
      <div className="player player-1 computer">
        <div className="player-type">Computer</div>
        <div className={`hand ${moveToStyle[playerMoves[PLAYER.N1]]}`}></div>
      </div>

      <div className="player player-2">
        <div className="player-type">
          {gameMode === MODE.PLAYER_VS_COMPUTER ? 'You' : 'Computer 2'}
        </div>
        <div className={`hand ${moveToStyle[playerMoves[PLAYER.N2]]}`}></div>
      </div>
    </main>
  );
}

export default ActionPicker;
