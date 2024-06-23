import { Player } from "../src/Player";

describe("Player (unit)", () => {
    let player: Player;

    beforeEach(() => {
        player = new Player("John");
    });

    it("should have name", () => {
        expect(player.name).toBe("John");
    });

    it("should be able to add colors to selected ones", () => {
        expect(player.selectedColors).toStrictEqual([]);
        player.selectColor("green");
        player.selectColor("yellow");
        expect(player.selectedColors).toStrictEqual(["green", "yellow"]);
    });

    it("should be able to reset selected colors", () => {
        player.selectColor("green");
        player.selectColor("yellow");
        player.clearSelectedColors();
        expect(player.selectedColors).toStrictEqual([]);
    });
});
