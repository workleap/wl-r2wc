import type { ReactPortal } from "react";
import { createPortal } from "react-dom";
import { Observable } from "./Observable.ts";
import { PropsProvider } from "./PropsProvider.tsx";

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
        // notifyRenderer();
    }
}

export class WebComponentHTMLElement<
    Props,
    Attributes = Props
> extends WebComponentHTMLElementBase {
    #props = new Observable<Attributes>();

    protected get props() {
        return this.#props;
    }

    protected get reactComponent(): React.ComponentType<Props> {
        throw new Error("You must implement this method in a subclass.");
    }

    connectedCallback() {
        super.connectedCallback();
    }

    protected mapAttributesToProps(attributes: Attributes): Props {
        // we could create a ensureProps function to ensure the attributes and props match.
        // For instance the props could have a required field that is not properly set
        return attributes as unknown as Props; // map 1 to 1 by default
    }

    renderReactComponent() {
        return (
            <PropsProvider Component={this.reactComponent} observable={this.props} mapAttributesToProps={this.mapAttributesToProps} />
        );
    }

    get customAttributes(): Attributes | undefined {
        return this.#props.value;
    }

    set customAttributes(value: Attributes) {
        this.#props.value = value;
    }
}
