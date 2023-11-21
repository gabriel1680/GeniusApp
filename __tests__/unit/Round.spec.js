import { Round } from '../../src/engine/Round';

import { createConfiguredRoundWith } from './game.fixture';

describe('Round (unit)', () => {

    /** @type {Round} */
    let round;

    beforeEach(() => {
        round = new Round();
    });

    it('should be able to create a new GameRound', () => {
        expect(round.colors).toHaveLength(1);
    });

    it('should be able to create a next GameRound', () => {
        const nextRound = round.createNextRound();
        expect(nextRound.colors).toHaveLength(2);
    });

    it('should be able to create a next GameRound with the colors of the previous round plus one', () => {
        const round = createConfiguredRoundWith(['yellow', 'green']);
        round.createNextRound();
        expect(round.colors).toHaveLength(3);
        expect(round.colors[0]).toBe('yellow');
        expect(round.colors[1]).toBe('green');
    });
});
