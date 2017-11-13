export const PLAYER = {
    N1: Symbol('PLAYER_1'),
    N2: Symbol('PLAYER_2'),
    NONE: Symbol('NONE'),
};

export const MOVE = {
    ROCK: Symbol('ROCK'),
    PAPER: Symbol('PAPER'),
    SCISSORS: Symbol('SCISSORS'),
};

const using = {
    [MOVE.ROCK]: { winsVs: move => move === MOVE.SCISSORS },
    [MOVE.PAPER]: { winsVs: move => move === MOVE.ROCK },
    [MOVE.SCISSORS]: { winsVs: move => move === MOVE.PAPER },
}

const Play = ({
    [PLAYER.N1]: move1,
    [PLAYER.N2]: move2,
  } = {}) => {
    let winner;

    if (!move1 || !move2) {
        winner = PLAYER.NONE;
    } else if (using[move1].winsVs(move2)) {
        winner = PLAYER.N1;
    } else if (using[move2].winsVs(move1)) {
        winner = PLAYER.N2;
    }

    return {
        winner
    }
};

export default Play;
