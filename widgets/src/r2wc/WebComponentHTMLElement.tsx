import type { ReactPortal } from "react";
import { createPortal } from "react-dom";
import { Observable } from "./Observable.ts";
import { PropsProvider } from "./PropsProvider.tsx";
import { notifyWidgetMountState } from "./WidgetsManager.tsx";

export class WebComponentHTMLElementBase extends HTMLElement {
    #portal: ReactPortal | null = null;

    static get tagName(): string {
        throw new Error("You must implement this method in a subclass.");
    }

    renderReactComponent(): JSX.Element {
        throw new Error("You must implement this method in a subclass.");
    }

    get renderedPortal(): ReactPortal {
        if (!this.#portal) {
            throw new Error("Portal has not been rendered yet.");
        }

        return this.#portal;
    }

    connectedCallback() {
        this.#portal = createPortal(this.renderReactComponent(), this);

        notifyWidgetMountState(this, "mounted");
    }

    disconnectedCallback() {
        this.#portal = null;

        notifyWidgetMountState(this, "unmounted");
    }
}

export interface MapType<Props> { [key: string]: { to: keyof Props; convert?: (value: string | null) => Props[keyof Props] } }

export class WebComponentHTMLElement<Props = unknown> extends WebComponentHTMLElementBase {
    #props = new Observable<Props>();


    protected get reactComponent(): React.ComponentType<Props> {
        throw new Error("You must implement this method in a subclass.");
    }
    renderReactComponent() {
        return (
            <PropsProvider Component={this.reactComponent} observable={this.#props} />
        );
    }

    get data(): Props | undefined {
        return this.#props.value;
    }

    set data(value: Props | undefined) {
        this.#props.value = value;
    }

    get attributesMap(): MapType<Props> | undefined {
        return undefined;
    }

    addEventListener(eventName: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        super.addEventListener(eventName, listener, options);

        const map = this.attributesMap?.[eventName];

        if (map != null) {
            this.data = {
                ...this.data ?? {} as Props,
                [map.to]: listener
            };
        }
    }


    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue !== newValue) {
            const map = this.attributesMap?.[name];
            const mapName = map != null ? map.to : name;
            const mapValue = map?.convert != null ? map.convert(newValue) : newValue;
            this.data = {
                ...this.data ?? {} as Props,
                [mapName]: mapValue
            };
        }
    }
}

