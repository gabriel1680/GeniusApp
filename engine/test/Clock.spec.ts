import { Clock, ClockEvents } from "../src";
import { Scheduler } from "../src/time/Scheduler";

describe("Clock (unit)", () => {
    let clock: Clock;
    let tickInterval: number;
    let scheduler: jest.Mocked<Scheduler>;

    beforeEach(() => {
        scheduler = {
            schedule: jest.fn(),
            cancel: jest.fn(),
        };
        tickInterval = 1000;
        clock = new Clock(scheduler, tickInterval);
    });

    it("should be able create a clock", () => {
        expect(clock.isRunning).toBeFalsy();
    });

    it("should be able to start a clock", () => {
        clock.start();
        expect(clock.isRunning).toBeTruthy();
        expect(scheduler.schedule).toHaveBeenCalled();
    });

    it("start a running clock should make nothing", async () => {
        clock.start();
        clock.start();
        expect(clock.isRunning).toBeTruthy();
        expect(scheduler.schedule).toHaveBeenCalledTimes(1);
    });

    it("stop a clock not started should make nothing", async () => {
        clock.stop();
        expect(clock.isRunning).toBeFalsy();
        expect(scheduler.schedule).not.toHaveBeenCalled();
        expect(scheduler.cancel).not.toHaveBeenCalled();
    });

    it("should be able to pause", async () => {
        clock.start();
        clock.stop();
        expect(clock.isRunning).toBeFalsy();
        expect(scheduler.cancel).toHaveBeenCalled();
    });

    it("should be able to react on each tick", async () => {
        const fakeScheduler: Scheduler = {
            schedule: function (fn: () => void, delay: number): void {
                fn();
            },
            cancel: function (): void {},
        };
        const tickSpy = jest.fn();
        const clock = new Clock(fakeScheduler);
        clock.on(ClockEvents.TICK, tickSpy);
        clock.start();
        expect(tickSpy).toHaveBeenCalledTimes(1);
    });
});
