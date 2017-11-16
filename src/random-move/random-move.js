import { MOVE } from '../play/play'

const moves = Object.values(MOVE);

// should be refactored out, but used only here for now
const randomNumber = (min = 0, max = 1) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const randomMove = () => moves[randomNumber(0, moves.length - 1)];

export default randomMove;
