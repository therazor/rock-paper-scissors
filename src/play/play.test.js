import play from './play';

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
