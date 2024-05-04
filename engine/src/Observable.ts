export abstract class Observable {
    private events: { [event: string]: CallableFunction[] };

    constructor() {
        this.events = {};
    }

    on(event: string, callback: CallableFunction): void {
        const handlers = this.events[event];
        handlers ? handlers.push(callback) : (this.events[event] = [callback]);
    }

    notify(event: string, data: unknown = undefined): void {
        const handlers = this.events[event];
        if (!handlers) return;
        for (const handler of handlers) {
            handler(data);
        }
    }
}

