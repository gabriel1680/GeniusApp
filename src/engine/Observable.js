/**
 * @abstract
 */
export class Observable {
    /**
     * @private
     * @property {{ [event: string]: CallableFunction[] }}
     */
    events;

    constructor() {
        this.events = {};
    }

    /**
     * @param {string} event
     * @param {CallableFunction} callback
     */
    on(event, callback) {
        const handlers = this.events[event];
        handlers ? handlers.push(callback) : (this.events[event] = [callback]);
    }

    /**
     * @param {string} event
     * @param {any} data
     */
    notify(event, data = undefined) {
        const handlers = this.events[event];
        if (!handlers) return;
        for (const handler of handlers) {
            handler(data);
        }
    }
}
