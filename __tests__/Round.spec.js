import { Round } from '../src/components/Genius/GameEngine';
import { createConfiguredRoundWith } from './game.fixture';

it('should be able to create a new GameRound', () => {
  const round = new Round();
  expect(round.colors).toHaveLength(1);
});

it('should be able to create a next GameRound', () => {
  const round = (new Round()).createNextRound();
  expect(round.colors).toHaveLength(2);
});

it('should be able to create a next GameRound with the colors of the previous round plus one', () => {
  const round = createConfiguredRoundWith(['yellow', 'green']);
  round.createNextRound();
  expect(round.colors).toHaveLength(3)
  expect(round.colors[0]).toBe('yellow');
  expect(round.colors[1]).toBe('green');
});
