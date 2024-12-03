import type { ReactPortal } from "react";
import React from "react";
import { createPortal } from "react-dom";
import { Observable } from "./Observable.ts";
import { PropsProvider } from "./PropsProvider.tsx";
import { type AttributeEventMap, getMapConvert, getMapName } from "./utils.ts";
import { notifyWidgetMountState } from "./WidgetsManager.tsx";

export class WebComponentHTMLElementBase extends HTMLElement {
    #portal: ReactPortal | null = null;

    static get tagName(): string {
        throw new Error("You must implement this method in a subclass.");
    }

    protected get initialStyle(): Partial<CSSStyleDeclaration> {
        return {};
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

    private applyInitialStyles() {
        for (const key in this.initialStyle) {
            if (!this.style[key] && this.initialStyle[key]) {
                this.style[key] = this.initialStyle[key];
            }
        }
    }

    connectedCallback() {
        this.applyInitialStyles();
        this.renewPortal();

        notifyWidgetMountState(this, "mounted");
    }

    disconnectedCallback() {
        this.#portal = null;

        notifyWidgetMountState(this, "unmounted");
    }

    renewPortal() {
        this.#portal = createPortal(this.renderReactComponent(), this);
    }
}

export class WebComponentHTMLElement<Props= unknown, ObservedAttributesType extends string = never> extends WebComponentHTMLElementBase {
    #props : Observable<Props>;

    constructor() {
        super();

        let alreadySetData: Props | undefined = undefined;

        try {
            //if the data is set before the element is defined in the DOM, the getter function will not override it!
            //so, we read the data to initialize the props with it and then remove it.
            //Removing it causes the getter to work as expected afterwards.
            //There are different reasons that causes the element to be defined in the DOM after the data is set.
            // 1. The script is loaded after the data is set due to network issues.
            // 2. The script is loaded after the data is set due to the script being loaded lately for any reason.

            alreadySetData = this.data;
            delete this.data;
        } catch {
            //the error happens in regular cases when this.data is not set.
            //in this situation, the #props has not been initialized yet and the getter function is being called which causes the error.
            //so, we catch the error and ignore it.
        }

        if (alreadySetData) {
            console.warn("The data has been set before the element is defined in the DOM. This means a potenial of delay rendering. Please make sure to load the widget script before setting the data.");
        }

        this.#props = new Observable<Props>(alreadySetData);
    }

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

    set data(value: Props) {
        this.#props.value = value;
    }

    get map(): AttributeEventMap<Props, ObservedAttributesType> | undefined {
        return undefined;
    }

    addEventListener(eventName: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        super.addEventListener(eventName, listener, options);

        const map = this.map?.events?.[eventName];

        if (map != null) {
            this.data = {
                ...(this.data ?? {} as Props),
                [getMapName(map)]: listener
            };
        }
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue !== newValue) {
            const map = this.map?.attributes?.[name as ObservedAttributesType];
            if (map != null) {
                const mapName = getMapName(map) ;
                const mapValue = getMapConvert(map)?.(newValue) ?? newValue;
                this.data = {
                    ...this.data ?? {} as Props,
                    [mapName]: mapValue
                };
            }
        }
    }
}
