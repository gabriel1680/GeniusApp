import { Round } from "./Round";
import { sleep } from '../utils';
import { GameState } from "./GameState";

export class GameEngine {

    /**
     * @private
     * @property {GameState}
     */
    state;

    constructor(round = new Round()) {
        this.state = new GameState(round);
    }

    async start() {
        while (!this.state.isGameOver) {
            await sleep();
            await this.blinkColors();
            this.state.setPlayerTurn();
            await this.waitForPlayerSelect();
            this.verifyPlayerPressedColors() ? this.nextRound() : this.state.gameOver();
        }
    }

    /** @private */
    async waitForPlayerSelect() {
        const MIN_TIME_TO_WAIT = 2000;
        const timePerItemInRound = 1000 * this.state.round.colors.length;
        const waitTime = timePerItemInRound < MIN_TIME_TO_WAIT ? MIN_TIME_TO_WAIT : timePerItemInRound;
        await sleep(waitTime);
    }

    /** @private */
    async blinkColors() {
        for(const color of this.state.round.colors) {
            this.state.changeCurrentColor(color);
            await sleep();
            this.state.changeCurrentColor('');
            await sleep();
        }
    }

    /**
     * @private
     * @returns {boolean}
     */
    verifyPlayerPressedColors() {
        for (let i = 0; i < this.state.round.colors.length; i++)
            if (this.state.player.selectedColors[i] !== this.state.round.colors[i])
                return false;
        return true;
    }

    /** @returns {void} */
    onGameOver(observer) {
        this.state.onGameOver(observer);
    }

    /** @returns {void} */
    onCurrentColorChange(observer) {
        this.state.onCurrentColorChange(observer);
    }

    /**
     * @param {string} color
     * @returns {void}
     */
    playerPressColor(color) {
        this.state.player.selectColor(color);
        if (!this.verifyPlayerPressedColors()) {
            this.state.gameOver();
        }
    }

    /** @returns {void} */
    nextRound() {
        this.state.nextRound();
    }

    /** @returns {void} */
    restart() {
        this.state.restart();
        this.start();
    }

    /** @returns {GameState} */
    getState() {
        return this.state.clone();
    }
}
