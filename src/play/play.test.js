import { default as play, PLAYER, MOVE }  from './play';

it('returns a game status when playing', () => {
  const status = play();
  expect(status).toMatchObject({});
});

it('returns a winner when playing', () => {
  const status = play();
  expect(status).toMatchObject({
    winner: expect.anything()
  });
});

it('identifies paper as winner vs rock', () => {
  const status = play({
    [PLAYER.N1]: MOVE.PAPER,
    [PLAYER.N2]: MOVE.ROCK,
  });

  expect(status).toMatchObject({
    winner: PLAYER.N1
  });
});

it('identifies scissors as winner vs paper', () => {
  const status = play({
    [PLAYER.N1]: MOVE.PAPER,
    [PLAYER.N2]: MOVE.SCISSORS,
  });

  expect(status).toMatchObject({
    winner: PLAYER.N2
  });
});

it('has no winners for rock vs rock', () => {
  const status = play({
    [PLAYER.N1]: MOVE.ROCK,
    [PLAYER.N2]: MOVE.ROCK,
  });

  expect(status).toMatchObject({
    winner: PLAYER.NONE
  });
});
