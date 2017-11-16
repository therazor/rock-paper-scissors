import React from 'react';
import { MOVE } from '../play/play'

const ActionPicker = ({ buttonsEnabled, clickCallback }) => {
  return (
    <ul className="action-picker">
      <li>
        <button className="pick-action ir rock"
          disabled={buttonsEnabled}
          onClick={() => clickCallback(MOVE.ROCK)}>Rock</button>
      </li>
      <li>
        <button className="pick-action ir paper"
          disabled={buttonsEnabled}
          onClick={() => clickCallback(MOVE.PAPER)}>Paper</button>
      </li>
      <li>
        <button className="pick-action ir scissors"
          disabled={buttonsEnabled}
          onClick={() => clickCallback(MOVE.SCISSORS)}>Scissors</button>
      </li>
    </ul>
  );
}

export default ActionPicker;
