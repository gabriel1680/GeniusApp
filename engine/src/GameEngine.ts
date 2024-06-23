import { sleep } from "./utils";
import { GameState } from "./GameState";
import { Player } from "./Player";

export class GameEngine {
    constructor(private readonly _state: GameState) {}

    public static create(player: string) {
        return new GameEngine(GameState.new(player));
    }

    async start(): Promise<void> {
        while (!this._state.isGameOver) {
            this._state.player.clearSelectedColors();
            await sleep();
            await this.blinkColors();
            this._state.setPlayerTurn();
            await this.waitForPlayerSelect();
            this.verifyAllPlayerPressedColors()
                ? this.nextRound()
                : this._state.gameOver();
        }
    }

    private async blinkColors(): Promise<void> {
        for (const color of this._state.round.colors) {
            this._state.changeCurrentColor(color);
            await sleep();
            this._state.changeCurrentColor("");
            await sleep();
        }
    }

    private async waitForPlayerSelect(): Promise<void> {
        const MIN_TIME_TO_WAIT = 500;
        await sleep(MIN_TIME_TO_WAIT * this._state.round.colors.length);
    }

    private verifyAllPlayerPressedColors(): boolean {
        for (let i = 0; i < this._state.round.colors.length; i++)
            if (
                this._state.player.selectedColors[i] !==
                this._state.round.colors[i]
            )
                return false;
        return true;
    }

    private verifyPlayerPressedColors(): boolean {
        for (let i = 0; i < this._state.player.selectedColors.length; i++)
            if (
                this._state.player.selectedColors[i] !==
                this._state.round.colors[i]
            )
                return false;
        return true;
    }

    onGameOver(observer: VoidFunction): void {
        this._state.on("gameOver", observer);
    }

    onCurrentColorChange(observer: VoidFunction): void {
        this._state.on("currentColorChange", observer);
    }

    playerPressColor(color: string): void {
        this._state.player.selectColor(color);
        if (!this.verifyPlayerPressedColors()) {
            this._state.gameOver();
        }
    }

    nextRound(): void {
        this._state.nextRound();
    }

    restart(): void {
        this._state.restart();
        this.start();
    }

    get state() {
        return this._state.toJSON();
    }
}
