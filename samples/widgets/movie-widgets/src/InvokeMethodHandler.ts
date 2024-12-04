
type EventCallback<T extends unknown[]> = (...args: T) => void;

export class InvokeMethodHandler<T extends unknown[]=[]> {
    private events: EventCallback<T>[] = [];

    on(callback: EventCallback<T>) {
        this.events.push(callback);
    }

    off(callback: EventCallback<T>) {
        if (!this.events) {return;}
        this.events = this.events.filter(cb => cb !== callback);
    }

    emit(...args: T) {
        if (!this.events) {return;}
        this.events.forEach(callback => callback(...args));
    }
}
