import { GameState } from "./GameState";

export class ColorBlinker {
    private lastBlinkedIdx = -1;
    private lastBlinkedColor: string | null = null;

    constructor(private readonly _state: GameState) {}

    getNextColorToBlink(): string | undefined {
        if (this.isLastBlinkBeforePlayerTurn()) {
            // reset idx
            this.lastBlinkedIdx = -1;
            return undefined;
        }
        this.lastBlinkedColor = this.getLastBlinkedColor();
        return this.lastBlinkedColor;
    }

    private isLastBlinkBeforePlayerTurn() {
        return (
            this.lastBlinkedIdx === this._state.round.colors.length - 1 &&
            this.lastBlinkedColor === ""
        );
    }

    private getLastBlinkedColor() {
        if (!this.isLastBlinkedColorEmpty()) {
            return "";
        }
        return this._state.round.colors[++this.lastBlinkedIdx];
    }

    private isLastBlinkedColorEmpty() {
        return this.lastBlinkedColor === "" || this.lastBlinkedColor === null;
    }
}
