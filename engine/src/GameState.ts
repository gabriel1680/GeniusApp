import { Observable } from "./Observable";
import { Player } from "./Player";
import { Round } from "./Round";

export class GameState extends Observable {
    constructor(
        private _player: Player,
        private _round: Round = Round.new(),
        private _isGameOver: boolean = false,
        private _isPlayerTurn: boolean = false,
        private _currentColor: string = ""
    ) {
        super();
    }

    public get currentColor(): string {
        return this._currentColor;
    }
    
    public get isPlayerTurn(): boolean {
        return this._isPlayerTurn;
    }

    public get player(): Player {
        return this._player;
    }

    public get round(): Round {
        return this._round;
    }

    public get isGameOver(): boolean {
        return this._isGameOver;
    }

    changeCurrentColor(color: string): void {
        this._currentColor = color;
        this.notify("currentColorChange", color);
    }

    gameOver(): void {
        this._isGameOver = true;
        this.notify("gameOver");
    }

    setPlayerTurn(): void {
        this._isPlayerTurn = true;
    }

    nextRound(): void {
        this._round = this.round.createNextRound();
    }

    restart(): void {
        this._round = Round.new();
        this.player.clearSelectedColors();
    }

    toJSON() {
        return {
            roundColors: this.round.colors,
            playerSelectedColors: this.player.selectedColors,
            isGameOver: this.isGameOver,
            isPlayerTurn: this.isPlayerTurn,
            currentColor: this.currentColor,
        };
    }
}
