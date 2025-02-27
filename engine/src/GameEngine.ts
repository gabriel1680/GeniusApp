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
            // reset idx
            this.lastBlinkedIdx = -1;
            this._state.setPlayerTurn();
            return;
        }

        if (this.lastBlinkedColor === "" || this.lastBlinkedColor === null) {
            this.lastBlinkedColor =
                this._state.round.colors[++this.lastBlinkedIdx];
        } else {
            this.lastBlinkedColor = "";
        }

        this._state.changeCurrentColor(this.lastBlinkedColor);
    }

    private _ticks = 0;

    private verifyAllPlayerPressedColors(): boolean {
        return this.haveWrongAnswer(this._state.round.colors.length);
    }

    private verifyPlayerPressedColors(): boolean {
        return this.haveWrongAnswer(this._state.player.selectedColors.length);
    }

    private haveWrongAnswer(n: number): boolean {
        for (let i = 0; i < n; i++) {
            if (this.isWrongColor(i)) return false;
        }
        return true;
    }

    private isWrongColor(i: number) {
        return (
            this._state.player.selectedColors[i] !== this._state.round.colors[i]
        );
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
    }

    get state() {
        return this._state.toJSON();
    }
}
