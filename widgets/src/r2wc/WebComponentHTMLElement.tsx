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

export class WebComponentHTMLElement<Props> extends WebComponentHTMLElementBase {
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

    set data(value: Props) {
        this.#props.value = value;
    }
}
