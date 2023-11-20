import { Player } from "./Player";
import { Round } from "./Round";

export class GameState {

    constructor(round) {
        this.round = round;
        this.player = new Player();
        this.isGameOver = false;
        this.isPlayerTurn = false;
        this.currentColor = '';
        this.events = {
            gameOver: [],
            currentColorChange: []
        };
    }

    onGameOver(observer) {
        this.events.gameOver.push(observer);
    }

    onCurrentColorChange(observer) {
        this.events.currentColorChange.push(observer);
    }

    changeCurrentColor(color) {
        this.currentColor = color;
    }

    setPlayerTurn() {
        this.isPlayerTurn = true;
    }

    gameOver() {
        this.isGameOver = true;
        this.events.gameOver.forEach((observerFn) => {
            observerFn();
        });
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
