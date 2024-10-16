import { useSyncExternalStore } from "react";

/**
 * Simple observable implementation.
 *
 * Has a `value` and lets you subscribe and unsubscribe to changes.
 */
export class Observable<T = unknown> {
    #listeners: ((value: T | null | undefined) => void)[] = [];
    #value: T | null | undefined;
    set value(value: T | null | undefined) {
        this.#value = value;

        for (const listener of this.#listeners) {
            listener(value);
        }
    }

    get value(): T | null | undefined {
        return this.#value;
    }

    constructor(value?: T) {
        this.#value = value;
    }

    addValueChangeListener(listener: (value: T | null | undefined) => void) {
        if (this.#listeners.includes(listener)) {
            return;
        }

        this.#listeners.push(listener);
    }

    removeValueChangeListener(listener: (value: T | null | undefined) => void) {
        const index = this.#listeners.indexOf(listener);

        if (index === -1) {
            return;
        }

        // Swap with last and pop, to keep the array stable and prevent duplication
        const last = this.#listeners[this.#listeners.length - 1];
        this.#listeners[index] = last;
        this.#listeners.pop();
    }
}

function subscribe<T>(observable: Observable<T>, listener: (value: T | null | undefined) => void) {
    observable.addValueChangeListener(listener);

    return () => {
        observable.removeValueChangeListener(listener);
    };
}

export function useObservable<T>(observable: Observable<T>) {
    return useSyncExternalStore(listener => subscribe(observable, listener), () => observable.value);
}
