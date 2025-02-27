import { GameState } from "./GameState";

export class GameRules {
    constructor(private readonly _state: GameState) {}

    verifyAllPlayerPressedColors(): boolean {
        return this.haveWrongAnswer(this._state.round.colors.length);
    }

    verifyPlayerPressedColors(): boolean {
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
}
