import { GameEngine } from "./GameEngine";

export class CycleExecutor {
    constructor(private readonly _engine: GameEngine) {}

    execute() {
        if (this._engine.state.isGameOver) {
            return;
        }
        if (!this._engine.state.isPlayerTurn) {
            this._engine.handleBlinkColor();
            return;
        }
        this._engine.execute();
    }
}
