import { Player } from '../../src/engine/Player';

describe('Player (unit)', () => {

    it('should be able to add colors to selected ones', () => {
        const player = new Player();
        expect(player.selectedColors).toStrictEqual([]);
        player.selectColor('green');
        player.selectColor('yellow');
        expect(player.selectedColors).toStrictEqual(['green', 'yellow']);
    });

    it('should be able to reset selected colors', () => {
        const player = new Player();
        player.selectColor('green');
        player.selectColor('yellow');
        player.clearSelectedColors();
        expect(player.selectedColors).toStrictEqual([]);
    });
});
