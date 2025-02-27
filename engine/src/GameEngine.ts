import { ColorBlinker } from "./ColorBlinker";
import { GameRules } from "./GameRules";
import { GameEvent, GameState } from "./GameState";

export class GameEngine {
    private readonly rules: GameRules;
    private readonly blinker: ColorBlinker;

    constructor(private readonly _state: GameState) {
        this.rules = new GameRules(_state);
        this.blinker = new ColorBlinker(_state);
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
            this.blinkColor();
            return;
        }
        if (this._ticks < this._state.round.colors.length) {
            this._ticks++;
            return;
        } else {
            // reset ticks
            this._ticks = 0;
        }
        this.rules.verifyAllPlayerPressedColors()
            ? this._state.nextRound()
            : this._state.gameOver();
    }

    private _ticks = 0;

    private blinkColor() {
        const nextColorToBlink = this.blinker.getNextColorToBlink();
        if (nextColorToBlink === undefined) {
            this._state.setPlayerTurn();
        } else {
            this._state.changeCurrentColor(nextColorToBlink);
        }
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
