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
            currentColorChange: []
        };
    }

    async start() {
        while (!this.isGameOver) {
            await sleep();
            await this.blinkColors();
            this.setPlayerTurn();
            await this.waitForPlayerSelect();
            this.verifyPlayerPressedColors() ? this.nextRound() : this.gameOver();
        }
    }

    /** @private */
    setPlayerTurn() {
        this.isPlayerTurn = true;
    }

    /** @private */
    async waitForPlayerSelect() {
        const MIN_TIME_TO_WAIT = 2000;
        const timePerItemInRound = 1000 * this.round.colors.length;
        const waitTime = timePerItemInRound < MIN_TIME_TO_WAIT ? MIN_TIME_TO_WAIT : timePerItemInRound;
        await sleep(waitTime);
    }

    /** @private */
    async blinkColors() {
        for(const color of this.round.colors) {
            this.changeCurrentColorTo(color);
            await sleep();
            this.currentColor = '';
            await sleep();
        }
    }

    changeCurrentColorTo(color) {
        this.currentColor = color;
        this.events.currentColorChange.forEach((observerFn) => {
            observerFn(color);
        });
    }

    onGameOver(observer) {
        this.events.gameOver.push(observer);
    }

    onCurrentColorChange(observer) {
        this.events.currentColorChange.push(observer);
    }

    playerPressColor(color) {
        this.player.selectColor(color);
        if (!this.verifyPlayerPressedColors()) {
            this.gameOver();
        }
    }

    /**
     * @private
     * @returns {boolean}
     */
    verifyPlayerPressedColors() {
        for (let i = 0; i < this.round.colors.length; i++)
            if (this.player.selectedColors[i] !== this.round.colors[i])
                return false;
        return true;
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
