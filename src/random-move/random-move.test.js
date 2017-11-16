import randomMove  from './random-move';
import { PLAYER, MOVE }  from '../play/play';

it('returns a game status when playing', () => {
  const move = randomMove();
  expect([MOVE.PAPER, MOVE.ROCK, MOVE.SCISSORS]).toContain(move);
});
