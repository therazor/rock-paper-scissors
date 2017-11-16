import React from 'react';
import { MODE } from '../App';
import { PLAYER } from '../play/play';
import './Result.css'

const Result = ({ winner, gameMode, animationComplete }) => {
  const message = winner => {
    switch (winner) {
      case PLAYER.N1:
        return 'Computer wins!';
      case PLAYER.N2:
        if (gameMode === MODE.COMPUTER_VS_COMPUTER)
          return 'Computer 2 wins!';
        else
          return 'You win!';
      default:
        return 'Draw';
    }
  }

  return (
    <div className={`outcome ${winner ? 'game-complete' : ''}`}
      onAnimationEnd={animationComplete}>
      <span>{message(winner)}</span>
    </div>
  );
}

export default Result;
