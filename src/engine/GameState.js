import { Observable } from "./Observable";
import { Player } from "./Player";
import { Round } from "./Round";

export class GameState extends Observable {

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

    clone() {
        const clone = Object.assign({}, this);
        Object.setPrototypeOf(clone, GameState.prototype); 
        return clone;
    }
}
