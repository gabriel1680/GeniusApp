import { GameEvent, GameState, Player } from "../src";
import { GameEngine } from "../src/GameEngine";
import { Round } from "../src/Round";

describe("GameEngine (unit)", () => {
    let game: GameEngine;

    beforeEach(() => {
        const round = new Round(["green"]);
        const state = new GameState(new Player("some player"), round);
        game = new GameEngine(state);
        game.start();
    });

    function updateGameTimes(n: number) {
        for (let i = 0; i < n; i++) {
            game.update();
        }
    }

    it("should create a new game instance", () => {
        game = GameEngine.create("some player");
        expect(game.state.roundColors).toHaveLength(1);
    });

    it("should start with one round and blinking state", () => {
        expect(game.state.isGameOver).toBeFalsy();
        expect(game.state.roundColors).toHaveLength(1);
        expect(game.state.isRunning).toBeTruthy();
    });

    it('given a game started, when update, then should stay at "blinking" state', () => {
        updateGameTimes(1);
        expect(game.state.currentColor).toBe("green");
        expect(game.state.isPlayerTurn).toBeFalsy();
    });

    it("should blink multiple round colors each rendering cycle", () => {
        expect(game.state.currentColor).toBe("");
        game.update();
        expect(game.state.currentColor).toBe("green");
        game.update();
        expect(game.state.currentColor).toBe("");
        game.update();
        game.playerPressColor("green");
        game.update();
        expect(game.state.currentColor).toBe("");
        game.update();
        expect(game.state.currentColor).toBe("");
    });

    it('given a game started and updated one time, when update again, then should stay at "blinking" state', () => {
        updateGameTimes(2);
        expect(game.state.currentColor).toBe("");
        expect(game.state.isPlayerTurn).toBeFalsy();
    });

    it('after game blinking game should be at "playerTurn state"', () => {
        updateGameTimes(3);
        expect(game.state.currentColor).toBe("");
        expect(game.state.isPlayerTurn).toBeTruthy();
    });

    it("after player turn, if it does not make a choice, then should be game over", () => {
        updateGameTimes(5);
        expect(game.state.isGameOver).toBeTruthy();
    });

    it("after player turn, when it does make a wrong choice, then should be game over", () => {
        updateGameTimes(3);
        game.playerPressColor("yellow");
        game.update();
        expect(game.state.isGameOver).toBeTruthy();
        expect(game.state.isRunning).toBeFalsy();
    });

    it("after player turn, when it does make a right choice, then should pass to another round", () => {
        updateGameTimes(3);
        game.playerPressColor("green");
        updateGameTimes(2);
        expect(game.state.isGameOver).toBeFalsy();
        expect(game.state.roundColors).toHaveLength(2);
        expect(game.state.isRunning).toBeTruthy();
    });

    // TODO: extract this test into integration tests
    it("should game over when not select a color", () => {
        game.update();
        expect(game.state.isPlayerTurn).toBeFalsy();

        game.update();
        expect(game.state.isPlayerTurn).toBeFalsy();

        game.update();
        expect(game.state.isPlayerTurn).toBeTruthy();

        game.update();
        game.update();
        expect(game.state.isGameOver).toBeTruthy();
        expect(game.state.isRunning).toBeFalsy();
        expect(game.state.isPlayerTurn).toBeFalsy();
    });

    it("should be able to restart game", () => {
        game.restart();
        expect(game.state.roundColors).toHaveLength(1);
        expect(game.state.playerSelectedColors).toHaveLength(0);
    });

    it("should be able to get the immutable game state clone", () => {
        const state = game.state;
        state.isGameOver = true;
        expect(state.isGameOver).toBeTruthy();
        expect(game.state.isGameOver).toBeFalsy();
    });

    describe("game events", () => {
        let gameOverObserver: VoidFunction;
        let colorChangedObserver: VoidFunction;
        let playerTurnChangedObserver: VoidFunction;

        beforeEach(() => {
            jest.clearAllMocks();
            gameOverObserver = jest.fn();
            colorChangedObserver = jest.fn();
            playerTurnChangedObserver = jest.fn();
            game.on(GameEvent.GAME_OVER, gameOverObserver);
            game.on(GameEvent.COLOR_CHANGED, colorChangedObserver);
            game.on(GameEvent.PLAYER_TURN_CHANGED, playerTurnChangedObserver);
        });

        it("should be able to notify on game over", () => {
            game.playerPressColor("red");
            expect(gameOverObserver).toHaveBeenCalled();
        });

        it("should not be able to notify on gameOver when event not occurred", () => {
            game.playerPressColor("green");
            expect(gameOverObserver).not.toHaveBeenCalled();
        });

        it("should be able to game over when player does not click on colors after timer", async () => {
            game.start();
            updateGameTimes(5);
            expect(game.state.isGameOver).toBeTruthy();
            expect(gameOverObserver).toHaveBeenCalled();
            expect(playerTurnChangedObserver).toHaveBeenCalled();
            expect(colorChangedObserver).toHaveBeenCalled();
        });
    });
});
