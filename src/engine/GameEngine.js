import { Player } from "./Player";
import { Round } from "./Round";

export class GameEngine {

    constructor(round = new Round()) {
        this.round = round;
        this.player = new Player();
        this.isGameOver = false;
        this.events = {
            gameOver: [],
            roundMove: [],
        };
    }

    onGameOver(observer) {
        this.addEventHandler('gameOver', observer);
    }

    onRoundMove(observer) {
        this.addEventHandler('roundMove', observer);
    }

    addEventHandler(event, handlerFn) {
        this.events[event].push(handlerFn)
    }

    playerPressColor(color) {
        this.player.selectColor(color);
        this.verifyPlayerPressedColors();
    }

    verifyPlayerPressedColors() {
        for (let i = 0; i < this.player.selectedColors.length; i++) {
            if (this.player.selectedColors[i] !== this.round.colors[i]) {
                this.gameOver();                
                break;
            }
        }
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
}
