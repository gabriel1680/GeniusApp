import { Player } from "./Player";
import { Round } from "./Round";
import { sleep } from '../utils';

export class GameEngine {

    constructor(round = new Round()) {
        this.round = round;
        this.player = new Player();
        this.isGameOver = false;
        this.isPlayerTurn = false;
        this.currentColor = '';
        this.events = {
            gameOver: [],
        };
    }

    async start() {
        while (this.isGameOver !== true) {
            await sleep();
            for (const color of this.round.colors) {
                this.currentColor = color;
                await sleep();
                this.currentColor = '';
                await sleep();
            }
            this.isPlayerTurn = true;
            // aguarda 2s por cor
            const minTime = 2000;
            const timePerItemInRound = 1000 * this.round.colors.length;
            await sleep(timePerItemInRound < minTime ? minTime : timePerItemInRound);
            if (this.player.selectedColors.length < this.round.colors.length) {
                this.isGameOver = true;
                break;
            }
            this.nextRound();
        }
    }

    onGameOver(observer) {
        this.events.gameOver.push(observer);
    }

    playerPressColor(color) {
        this.player.selectColor(color);
        this.verifyPlayerPressedColors();
    }

    /** @private */
    verifyPlayerPressedColors() {
        for (let i = 0; i < this.player.selectedColors.length; i++) {
            if (this.player.selectedColors[i] !== this.round.colors[i]) {
                this.gameOver();                
                break;
            }
        }
    }

    /** @private */
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
        this.start();
    }
}
