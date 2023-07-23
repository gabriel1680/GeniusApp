export class GameEngine {

    constructor(round = new Round()) {
        this.round = round;
        this.player = new Player();
        this.isGameOver = false;
        this.events = {
            gameOver: [],
        };
    }

    onGameOver(observer) {
        this.events.gameOver.push(observer);
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

export class Player {

    constructor() {
        this.selectedColors = [];
    }

    selectColor(color) {
        this.selectedColors.push(color);
    }

    clearSelectedColors() {
        this.selectedColors = [];
    }
}

export class Round {

    COLORS = ['red', 'green', 'blue', 'yellow'];

    /**
     * @param {Round} round 
     */
    constructor(round = {}) {
        this.colors = round?.colors ?? [];
        this.generateRoundColors();
    }

    generateRoundColors() {
        this.colors.push(this.getRandomColor());
    }

    getRandomColor() {
        const min = 0;
        const max = this.COLORS.length - 1;
        const randomColorIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        return this.COLORS[randomColorIndex];
    }

    createNextRound() {
        return new Round(this);
    }

    /**
     * Para propósitos de teste
     * 
     * @param {string[]} colors Cores do round
     */
    setRoundColors(colors) {
        this.colors = colors;
    }
}
