import { Scheduler } from '@genius/engine/dist/time/Scheduler';

export class Timer {
    private readonly isRunning: boolean;
    private duration: number;

    constructor(
        private readonly scheduler: Scheduler,
        private readonly intervalMs: number = 100,
    ) {
        this.isRunning = false;
        this.duration = 0;
    }

    start(consumer: () => void, duration: number): void {
        if (this.isRunning) return;
        this.duration = duration;
        this.scheduler.schedule(() => {
            if (this.duration <= 0) {
                this.scheduler.cancel();
                return;
            }
            this.duration -= this.intervalMs;
            consumer();
        }, this.intervalMs);
    }

    pause(): void {
        if (!this.isRunning) return;
        this.scheduler.cancel();
    }

    stop() {
        if (this.isRunning) {
            this.scheduler.cancel();
        }
        this.duration = 0;
    }
}
