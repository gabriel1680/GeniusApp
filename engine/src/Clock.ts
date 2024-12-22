export class Clock {
    constructor(private interval = 1000, private _isPaused = false) {}

    async *tick() {
        while (!this._isPaused) {
            yield await this.sleep(this.interval);
        }
    }

    togglePause() {
        this._isPaused = !this._isPaused;
    }

    get isPaused(): boolean {
        return this._isPaused;
    }

    protected sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(() => resolve(), ms));
    }
}
