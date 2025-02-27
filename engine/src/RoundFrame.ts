import { GameState } from "./GameState";

export class RoundFrame {
    private _ticks = 0;

    constructor(private readonly _state: GameState) {}

    update() {
        if (this.haveNotEndCurrentRound()) {
            this._ticks++;
        } else {
            // reset ticks (new frame)
            this._ticks = 0;
        }
    }

    get isNextRoundFrame(): boolean {
        return this._ticks === 0;
    }

    private haveNotEndCurrentRound() {
        return this._ticks < this._state.round.colors.length;
    }
}
