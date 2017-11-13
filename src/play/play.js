const Play = () => ({
    winner: PLAYER.N1
});

export default Play;

export const PLAYER = {
    N1: Symbol('PLAYER_1'),
    N2: Symbol('PLAYER_2'),
};

export const MOVE = {
    ROCK: Symbol('ROCK'),
    PAPER: Symbol('PAPER'),
};
