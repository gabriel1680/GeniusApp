export class Round {

    COLORS = ['red', 'green', 'blue', 'yellow'];

    /** @param {string[]} colors */
    constructor(colors = []) {
        this.colors = colors;
    }

    /** @private */
    generateRoundColors() {
        this.colors.push(this.getRandomColor());
    }

    /** @private */
    getRandomColor() {
        const min = 0;
        const max = this.COLORS.length - 1;
        const randomColorIndex =
            Math.floor(Math.random() * (max - min + 1)) + min;
        return this.COLORS[randomColorIndex];
    }

    createNextRound() {
        const newRound = Round.from(this);
        newRound.generateRoundColors();
        return newRound;
    }

    getLastColor() {
        return this.colors.at(-1);
    }

    /**
     * @param {Round} aRound
     * @returns {Round}
     */
    static from(aRound) {
        return new Round(aRound.colors);
    }

    /**
     * @returns {Round}
     */
    static new() {
        const round = new Round([]);
        round.generateRoundColors();
        return round;
    }
}
