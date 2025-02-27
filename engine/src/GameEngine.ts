import { GameRules } from "./GameRules";
import { GameEvent, GameState } from "./GameState";

export class GameEngine {
    private readonly rules: GameRules;

    constructor(private readonly _state: GameState) {
        this.rules = new GameRules(_state);
    }

    public static create(player: string) {
        return new GameEngine(GameState.new(player));
    }

    start(): void {
        this._state.start();
    }

    public update(): void {
        if (this._state.isGameOver) {
            return;
        }
        if (!this._state.isPlayerTurn) {
            this.blinkColors();
            return;
        }
        if (this._ticks < this._state.round.colors.length) {
            this._ticks++;
            return;
        }
        // reset ticks
        this._ticks = 0;
        this.rules.verifyAllPlayerPressedColors()
            ? this._state.nextRound()
            : this._state.gameOver();
    }

    private lastBlinkedIdx = -1;
    private lastBlinkedColor: string | null = null;

    private blinkColors(): void {
        if (this.isLastBlinkBeforePlayerTurn()) {
            // reset idx
            this.lastBlinkedIdx = -1;
            this._state.setPlayerTurn();
            return;
        }
        this.lastBlinkedColor = this.getLastBlinkedColor();
        this._state.changeCurrentColor(this.lastBlinkedColor);
    }

    private _ticks = 0;

    private isLastBlinkBeforePlayerTurn() {
        return (
            this.lastBlinkedIdx === this._state.round.colors.length - 1 &&
            this.lastBlinkedColor === ""
        );
    }

    private getLastBlinkedColor() {
        if (this.isLastBlinkedColorEmpty()) {
            return this._state.round.colors[++this.lastBlinkedIdx];
        } else {
            return "";
        }
    }

    private isLastBlinkedColorEmpty() {
        return this.lastBlinkedColor === "" || this.lastBlinkedColor === null;
    }

    on(event: GameEvent, observer: VoidFunction): void {
        this._state.on(event, observer);
    }

    playerPressColor(color: string): void {
        this._state.player.selectColor(color);
        if (!this.rules.verifyPlayerPressedColors()) {
            this._state.gameOver();
        }
    }

    restart(): void {
        this._state.restart();
    }

    get state() {
        return this._state.toJSON();
    }
}
