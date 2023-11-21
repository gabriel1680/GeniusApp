import { Observable } from "./Observable";
import { Player } from "./Player";
import { Round } from "./Round";

export class GameState extends Observable {

    /** @property {Round} */
    round;

    /** @property {Player} */
    player;

    /** @property {boolean} */
    isGameOver;

    /** @property {boolean} */
    isPlayerTurn;

    /** @property {string} */
    currentColor;

    constructor(round) {
        super();
        this.round = round;
        this.player = new Player();
        this.isGameOver = false;
        this.isPlayerTurn = false;
        this.currentColor = '';
    }

    changeCurrentColor(color) {
        this.currentColor = color;
        this.notify('currentColorChange', color);
    }
    
    gameOver() {
        this.isGameOver = true;
        this.notify('gameOver');
    }

    setPlayerTurn() {
        this.isPlayerTurn = true;
    }

    nextRound() {
        this.round = this.round.createNextRound();
    }

    restart() {
        this.round = new Round();
        this.player.clearSelectedColors();
    }

    toJSON() {
        return {
            roundColors: this.round.colors,
            playerSelectedColors: this.player.selectedColors,
            isGameOver : this.isGameOver,
            isPlayerTurn : this.isPlayerTurn,
            currentColor : this.currentColor,
        };
    }
}
