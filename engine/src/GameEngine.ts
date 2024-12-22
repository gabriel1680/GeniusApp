import { GameEvent, GameState } from "./GameState";

export class GameEngine {
    constructor(private readonly _state: GameState) {}

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
        this.verifyAllPlayerPressedColors()
            ? this._state.nextRound()
            : this._state.gameOver();
    }

    private lastBlinkedIdx = -1;
    private lastBlinkedColor: string | null = null;

    private blinkColors(): void {
        if (
            this.lastBlinkedIdx === this._state.round.colors.length - 1 &&
            this.lastBlinkedColor === ""
        ) {
            this._state.setPlayerTurn();
            return;
        }

        if (this.lastBlinkedColor === "" || this.lastBlinkedColor === null) {
            this.lastBlinkedColor =
                this._state.round.colors[this.lastBlinkedIdx++];
        } else {
            this.lastBlinkedColor = "";
        }

        this._state.changeCurrentColor(this.lastBlinkedColor);
    }

    private _ticks = 0;

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

    on(event: GameEvent, observer: VoidFunction): void {
        this._state.on(event, observer);
    }

    playerPressColor(color: string): void {
        this._state.player.selectColor(color);
        if (!this.verifyPlayerPressedColors()) {
            this._state.gameOver();
        }
    }

    restart(): void {
        this._state.restart();
        this.start();
    }

    get state() {
        return this._state.toJSON();
    }
}
