import { Round } from "../src/Round";
import { GameEngine } from "../src/GameEngine";
import { sleep } from "../src/utils";
import { GameState, Player } from "../src";

describe("GameEngine (unit)", () => {
    let game: GameEngine;
    let gamePromise: Promise<void>;

    beforeEach(() => {
        const round = new Round(["green"]);
        const state = new GameState(new Player("some player"), round);
        game = new GameEngine(state);
        gamePromise = game.start();
    });

    afterEach(async () => {
        await gamePromise;
    });

    it("should be able to create a new game instance with a round", () => {
        const game = GameEngine.create("some player");
        expect(game.state.roundColors).toHaveLength(1);
    });

    it("should be able to calculate when the color is incorrect when pressed in relation to the round colors", () => {
        game.playerPressColor("green");
        expect(game.state.isGameOver).toBeFalsy();
        expect(game.state.isRunning).toBeTruthy();
    });

    it("should be able to calculate when the color is correct when pressed in relation to the round colors", () => {
        game.playerPressColor("red");
        expect(game.state.isGameOver).toBeTruthy();
        expect(game.state.isRunning).toBeFalsy();
    });

    it("should be able to go to next round", () => {
        game.nextRound();
        expect(game.state.roundColors).toHaveLength(2);
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

    it("should be able to pass the round when player chose the right color", async () => {
        await sleep(500);
        game.playerPressColor("green");
        await sleep(500);
        expect(game.state.roundColors).toHaveLength(2);
    });

    it("should be able to call player turn changed callback", async () => {
        await sleep(500);
        game.playerPressColor("green");
        await sleep(500);
        expect(game.state.roundColors).toHaveLength(2);
    });

    it("should be able to await more as round length increases", async () => {
        await sleep(300);
        game.playerPressColor("green");
        await sleep(1000);
        game.playerPressColor("green");
        game.playerPressColor(game.state.roundColors.at(-1)!);
        await sleep(1300);
        expect(game.state.roundColors).toHaveLength(3);
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
            game.onGameOver(gameOverObserver);
            game.onCurrentColorChange(colorChangedObserver);
            game.onPlayerTurnColorChange(playerTurnChangedObserver);
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
            await sleep(2000);
            expect(game.state.isGameOver).toBeTruthy();
            expect(gameOverObserver).toHaveBeenCalled();
            expect(playerTurnChangedObserver).toHaveBeenCalled();
            expect(colorChangedObserver).toHaveBeenCalled();
        });
    });
});
