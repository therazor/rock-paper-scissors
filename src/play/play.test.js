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
