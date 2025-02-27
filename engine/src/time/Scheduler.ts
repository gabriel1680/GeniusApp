export interface Scheduler {
    schedule(fn: () => void, delay: number): void;
    cancel(): void;
}
