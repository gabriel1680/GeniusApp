import { Observable } from "../Observable";
import { Scheduler } from "./Scheduler";

export class Clock extends Observable {
    private _isRunning = false;

    constructor(
        private readonly scheduler: Scheduler,
        private readonly tickDurationMs: number = 1000
    ) {
        super();
    }

    start() {
        if (this.isRunning) return;
        this.scheduler.schedule(
            () => this.notify(ClockEvents.TICK),
            this.tickDurationMs
        );
        this._isRunning = true;
    }

    stop() {
        if (!this._isRunning) return;
        this.scheduler.cancel();
        this._isRunning = false;
    }

    get isRunning() {
        return this._isRunning;
    }
}

export enum ClockEvents {
    TICK = "tick",
}
