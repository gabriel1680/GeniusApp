import { Clock } from "../src";

describe("Clock (unit)", () => {
    class TestableClock extends Clock {
        protected sleep(ms: number): Promise<void> {
            return new Promise((r) => r());
        }
    }

    it("should be able create a clock", () => {
        const clock = new Clock();
        expect(clock.isPaused).toBeFalsy();
    });

    it("should be able to tick", async () => {
        const clock = new TestableClock();
        const gen = clock.tick();
        await gen.next();
    });

    it("should not be able to tick when pause", async () => {
        const clock = new TestableClock();
        for await (const _ of clock.tick()) {
            clock.togglePause();
        }
        expect(clock.isPaused).toBeTruthy();
    });

    it("should be able to toggle pause", async () => {
        const clock = new Clock(1000, true);
        expect(clock.isPaused).toBeTruthy();

        clock.togglePause();
        expect(clock.isPaused).toBeFalsy();
    });
});
