import { Scheduler } from "./Scheduler";

export class NodeJSScheduler implements Scheduler {
    private timerId: NodeJS.Timeout | null = null;

    schedule(fn: () => void, delay: number): void {
        this.timerId = setInterval(fn, delay);
    }

    cancel(): void {
        if (!this.timerId) return;
        clearInterval(this.timerId);
        this.timerId = null;
    }
}
