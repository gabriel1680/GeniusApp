import { sleep } from "./utils";

export class Timer {
    constructor(private interval = 500, private _isPaused = false) {}

    async *tick() {
        while (!this._isPaused) {
            yield await sleep(this.interval);
        }
    }

    get isPaused(): boolean {
        return this._isPaused;
    }
}
