export class Round {

    static COLORS = ["red", "green", "blue", "yellow"];

    private _colors: string[];

    constructor(colors: string[] = []) {
        this._colors = [...colors];
    }

    private generateRoundColors() {
        this._colors.push(this.getRandomColor());
    }

    private getRandomColor() {
        const min = 0;
        const max = Round.COLORS.length - 1;
        const randomColorIndex =
            Math.floor(Math.random() * (max - min + 1)) + min;
        return Round.COLORS[randomColorIndex];
    }

    createNextRound(): Round {
        const newRound = Round.from(this);
        newRound.generateRoundColors();
        return newRound;
    }

    getLastColor(): string {
        return this._colors.at(-1) as string;
    }

    static from(aRound: Round): Round {
        return new Round(aRound._colors);
    }

    static new(): Round {
        const round = new Round([]);
        round.generateRoundColors();
        return round;
    }

    get colors(): string[] {
        return [...this._colors];
    }
}
