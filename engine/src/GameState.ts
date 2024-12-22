import { Observable } from "./Observable";
import { Player } from "./Player";
import { Round } from "./Round";

export class GameState extends Observable {
    constructor(
        private _player: Player,
        private _round: Round = Round.new(),
        private _isGameOver: boolean = false,
        private _isPlayerTurn: boolean = false,
        private _isRunning = false,
        private _currentColor: string = ""
    ) {
        super();
    }

    static new(player: string): GameState {
        return new GameState(new Player(player));
    }

    changeCurrentColor(color: string): void {
        this._currentColor = color;
        this.notify(GameEvent.COLOR_CHANGED, color);
    }

    gameOver(): void {
        this._isGameOver = true;
        this._isRunning = false;
        this._isPlayerTurn = false;
        this.notify(GameEvent.GAME_OVER);
    }

    start(): void {
        this._isRunning = true;
        this._isGameOver = false;
        this._isPlayerTurn = false;
    }

    setPlayerTurn(isPlayerTurn = true): void {
        this._isPlayerTurn = isPlayerTurn;
        this.notify(GameEvent.PLAYER_TURN_CHANGED, isPlayerTurn);
    }

    nextRound(): void {
        this._round = this.round.createNextRound();
        this.player.clearSelectedColors();
        this.setPlayerTurn(false);
    }

    restart(): void {
        this._round = Round.new();
        this.player.clearSelectedColors();
        this.start();
    }

    toJSON() {
        return {
            roundColors: this.round.colors,
            playerSelectedColors: this.player.selectedColors,
            isGameOver: this.isGameOver,
            isRunning: this.isRunning,
            isPlayerTurn: this.isPlayerTurn,
            currentColor: this.currentColor,
        };
    }

    get currentColor(): string {
        return this._currentColor;
    }

    get isPlayerTurn(): boolean {
        return this._isPlayerTurn;
    }

    get player(): Player {
        return this._player;
    }

    get round(): Round {
        return this._round;
    }

    get isGameOver(): boolean {
        return this._isGameOver;
    }

    get isRunning(): boolean {
        return this._isRunning;
    }
}

export enum GameEvent {
    COLOR_CHANGED = "colorChanged",
    GAME_OVER = "gameOver",
    PLAYER_TURN_CHANGED = "playerTurnChanged",
}
