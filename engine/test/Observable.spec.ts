import { Observable } from '../src/Observable';

class StubObservable extends Observable { }

describe('Observable', () => {
    let sut: StubObservable;

    beforeEach(() => {
        sut = new StubObservable();
    });

    it('should not be able to call a handler that is not subscribed', () => {
        const handler = jest.fn();
        const eventName = 'event-key';
        const anotherEventName = 'another-event-key';
        sut.on(eventName, handler);
        sut.notify(anotherEventName);
        expect(handler).not.toHaveBeenCalled();
    });

    it('should be able to react to a event', () => {
        const handler = jest.fn();
        const eventName = 'event-key';
        sut.on(eventName, handler);
        sut.notify(eventName);
        expect(handler).toHaveBeenCalled();
    });

    it('should be able to multiple handlers', () => {
        const handler1 = jest.fn();
        const handler2 = jest.fn();
        const eventName = 'event-key';
        sut.on(eventName, handler1);
        sut.on(eventName, handler2);
        sut.notify(eventName);
        expect(handler1).toHaveBeenCalled();
        expect(handler2).toHaveBeenCalled();
    });
});

