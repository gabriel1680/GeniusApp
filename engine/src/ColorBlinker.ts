import { GameState } from "./GameState";

export class ColorBlinker {
    private _lastBlinkedIdx = -1;
    private _lastBlinkedColor: string | null = null;

    constructor(private readonly _state: GameState) {}

    blink(): void {
        if (this.isLastBlinkBeforePlayerTurn()) {
            // reset idx
            this._lastBlinkedIdx = -1;
            this._lastBlinkedColor = null;
            return;
        }
        this._lastBlinkedColor = this.getLastBlinkedColor();
    }

    get lastBlinkedColor() {
        return this._lastBlinkedColor;
    }

    private isLastBlinkBeforePlayerTurn() {
        return (
            this._lastBlinkedIdx === this._state.round.colors.length - 1 &&
            this._lastBlinkedColor === ""
        );
    }

    private getLastBlinkedColor() {
        if (!this.isLastBlinkedColorEmpty()) {
            return "";
        }
        return this._state.round.colors[++this._lastBlinkedIdx];
    }

    private isLastBlinkedColorEmpty() {
        return this._lastBlinkedColor === "" || this._lastBlinkedColor === null;
    }
}
