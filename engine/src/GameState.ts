import { Observable } from "./Observable";
import { Player } from "./Player";
import { Round } from "./Round";

export class GameState extends Observable {

    round: Round;

    player: Player;

    isGameOver: boolean;

    isPlayerTurn: Boolean;

    currentColor: string;

    constructor(round: Round) {
        super();
        this.round = round;
        this.player = new Player();
        this.isGameOver = false;
        this.isPlayerTurn = false;
        this.currentColor = '';
    }

    changeCurrentColor(color: string): void {
        this.currentColor = color;
        this.notify('currentColorChange', color);
    }

    gameOver(): void {
        this.isGameOver = true;
        this.notify('gameOver');
    }

    setPlayerTurn(): void {
        this.isPlayerTurn = true;
    }

    nextRound(): void {
        this.round = this.round.createNextRound();
    }

    restart(): void {
        this.round = Round.new();
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

