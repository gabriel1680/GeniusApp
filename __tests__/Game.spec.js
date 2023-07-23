import { GameEngine } from '../src/engine/GameEngine';
import { Round } from '../src/engine/Round';

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

it('should be able to calculate when the color is incorrect when pressed in relation to the round colors', () => {
  const round = createConfiguredRoundWith(['green', 'yellow']);
  const game = new GameEngine(round);
  game.playerPressColor('green');
  expect(game.isGameOver).toBeFalsy();
  game.playerPressColor('red');
  expect(game.isGameOver).toBeTruthy();
});

it('should be able to calculate when the color is correct when pressed in relation to the round colors', () => {
  const round = new createConfiguredRoundWith(['green']);
  const game = new GameEngine(round);
  game.playerPressColor('red');
  expect(game.isGameOver).toBeTruthy();
});

it('should be able to notify observers subscribed on gameOver event', () => {
  const round = new createConfiguredRoundWith(['green']);
  const game = new GameEngine(round);
  const gameOverObserver = jest.fn();
  game.onGameOver(gameOverObserver);
  game.playerPressColor('red');
  expect(gameOverObserver).toHaveBeenCalled();
});

it('should not be able to notify observers subscribed on gameOver event not occurred', () => {
  const round = new createConfiguredRoundWith(['green']);
  const game = new GameEngine(round);
  const gameOverObserver = jest.fn();
  game.onGameOver(gameOverObserver);
  game.playerPressColor('green');
  expect(gameOverObserver).not.toHaveBeenCalled();
});

it('should be able to go to next round', () => {
  const game = new GameEngine();
  expect(game.round.colors.length).toBe(1);
  game.nextRound();
  expect(game.round.colors.length).toBe(2);
});

it('should be able to restart game', () => {
  const game = new GameEngine();
  game.nextRound();
  game.restart();
  expect(game.round.colors).toHaveLength(1);
  expect(game.player.selectedColors).toHaveLength(0);
});
