import { Round } from '../src/Round';

describe('Round (unit)', () => {

    let round: Round;

    beforeEach(() => {
        round = new Round(['blue']);
    });

    it('should be able to create an empty round', () => {
        const round = new Round();
        expect(round.colors).toHaveLength(0);
    });

    it('should be able to create a new GameRound', () => {
        expect(round.colors).toHaveLength(1);
    });

    it('should be able to get the last color', () => {
        expect(round.getLastColor()).toBe('blue');
    });

    it('should be able to create a next GameRound', () => {
        const nextRound = round.createNextRound();
        expect(nextRound.colors).toHaveLength(2);
    });

    it('should be able to create a random round', () => {
        expect(Round.new().colors).toHaveLength(1);
    });

    it('should be able to create a next GameRound with the colors of the previous round plus one', () => {
        const round = new Round(['yellow', 'green']);
        const nextRound = round.createNextRound();
        expect(nextRound.colors).toHaveLength(3);
        expect(nextRound.colors[0]).toBe('yellow');
        expect(nextRound.colors[1]).toBe('green');
    });
});

