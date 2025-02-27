import { ColorBlinker } from "./ColorBlinker";
import { CycleExecutor } from "./CycleExecutor";
import { GameRules } from "./GameRules";
import { GameEvent, GameState } from "./GameState";
import { RoundFrame } from "./RoundFrame";

export class GameEngine {
    private readonly rules: GameRules;
    private readonly blinker: ColorBlinker;
    private readonly roundFrame: RoundFrame;
    private readonly cycleExecutor: CycleExecutor;

    constructor(private readonly _state: GameState) {
        this.rules = new GameRules(_state);
        this.blinker = new ColorBlinker(_state);
        this.roundFrame = new RoundFrame(_state);
        this.cycleExecutor = new CycleExecutor(this);
    }

    public static create(player: string) {
        return new GameEngine(GameState.new(player));
    }

    start(): void {
        this._state.start();
    }

    update(): void {
        this.cycleExecutor.execute();
    }

    handleBlinkColor() {
        this.blinker.blink();
        const nextColorToBlink = this.blinker.lastBlinkedColor;
        if (nextColorToBlink === null) {
            this._state.setPlayerTurn();
        } else {
            this._state.changeCurrentColor(nextColorToBlink);
        }
    }

    execute() {
        this.roundFrame.update();
        if (!this.roundFrame.isNextRoundFrame) {
            return;
        }
        this.rules.verifyAllPlayerPressedColors()
            ? this._state.nextRound()
            : this._state.gameOver();
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
