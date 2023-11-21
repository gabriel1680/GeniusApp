import { GameEngine } from '../../src/engine/GameEngine';
import { sleep } from '../../src/utils';

import { createConfiguredRoundWith } from './game.fixture';

describe('GameEngine (unit)', () => {

  /** @type {GameEngine} */
  let game;

  beforeEach(() => {
    const round = createConfiguredRoundWith(['green']);
    game = new GameEngine(round);
  })

  it('should be able to calculate when the color is incorrect when pressed in relation to the round colors', () => {
    game.playerPressColor('green');
    expect(game.state.isGameOver).toBeFalsy();
  });

  it('should be able to calculate when the color is correct when pressed in relation to the round colors', () => {
    game.playerPressColor('red');
    expect(game.state.isGameOver).toBeTruthy();
  });

  it('should be able to go to next round', () => {
    game.nextRound();
    expect(game.state.roundColors).toHaveLength(2);
  });

  it('should be able to restart game', () => {
    game.restart();
    expect(game.state.roundColors).toHaveLength(1);
    expect(game.state.playerSelectedColors).toHaveLength(0);
  });

  it('should be able to get the immutable game state clone', () => {
    const state = game.state;
    state.isGameOver = true;
    expect(state.isGameOver).toBeTruthy();
    expect(game.state.isGameOver).toBeFalsy();
  });

  describe('on game over', () => {

    let gameOverObserver;

    beforeEach(() => {
      gameOverObserver = jest.fn();
      game.onGameOver(gameOverObserver);
    })
      
    it('should be able to notify observers subscribed', () => {
      game.playerPressColor('red');
      expect(gameOverObserver).toHaveBeenCalled();
    });

    it('should not be able to notify observers subscribed on gameOver event not occurred', () => {
      game.playerPressColor('green');
      expect(gameOverObserver).not.toHaveBeenCalled();
    });

    it('should be able to game over when player does not click on colors after timer', async () => {
      game.start();
      await sleep(4000);
      expect(game.state.isGameOver).toBeTruthy();
      expect(gameOverObserver).toHaveBeenCalled();
    });
  });

});
