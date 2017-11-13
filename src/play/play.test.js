import play from './play';

it('returns a game status when playing', () => {
  const status = play();
  expect(status).toMatchObject({});
});
