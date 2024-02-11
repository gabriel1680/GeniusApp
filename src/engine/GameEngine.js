import { Round } from "./Round";
import { sleep } from '../utils';
import { GameState } from "./GameState";

export class GameEngine {

    /**
     * @private
     * @property {GameState}
     */
    _state;

    constructor(round = Round.new()) {
        this._state = new GameState(round);
    }

    async start() {
        while (!this._state.isGameOver) {
            await sleep();
            await this.blinkColors();
            this._state.setPlayerTurn();
            await this.waitForPlayerSelect();
            this.verifyPlayerPressedColors() ? this.nextRound() : this._state.gameOver();
        }
    }

    /** @private */
    async waitForPlayerSelect() {
        const MIN_TIME_TO_WAIT = 2000;
        const timePerItemInRound = 1000 * this._state.round.colors.length;
        const waitTime = timePerItemInRound < MIN_TIME_TO_WAIT ? MIN_TIME_TO_WAIT : timePerItemInRound;
        await sleep(waitTime);
    }

    /** @private */
    async blinkColors() {
        for(const color of this._state.round.colors) {
            this._state.changeCurrentColor(color);
            await sleep();
            this._state.changeCurrentColor('');
            await sleep();
        }
    }

    /**
     * @private
     * @returns {boolean}
     */
    verifyPlayerPressedColors() {
        for (let i = 0; i < this._state.round.colors.length; i++)
            if (this._state.player.selectedColors[i] !== this._state.round.colors[i])
                return false;
        return true;
    }

    /** @returns {void} */
    onGameOver(observer) {
        this._state.on('gameOver', observer);
    }

    /** @returns {void} */
    onCurrentColorChange(observer) {
        this._state.on('currentColorChange', observer);
    }

    /**
     * @param {string} color
     * @returns {void}
     */
    playerPressColor(color) {
        this._state.player.selectColor(color);
        if (!this.verifyPlayerPressedColors()) {
            this._state.gameOver();
        }
    }

    /** @returns {void} */
    nextRound() {
        this._state.nextRound();
    }

    /** @returns {void} */
    restart() {
        this._state.restart();
        this.start();
    }

    /** @returns {{ isGameOver: boolean, isPlayerTurn: boolean, roundColors: string[], playerSelectedColors: string[], currentColor: string }} */
    get state() {
        return this._state.toJSON();
    }
}
