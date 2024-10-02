import { Observable } from "./Observable.ts";
import { PropsProvider } from "./PropsProvider.tsx";

export class WebComponentHTMLElementBase extends HTMLElement {
    renderReactComponent(): JSX.Element {
        throw new Error("You must implement this method in a subclass.");
    }

    static get tagName(): string {
        throw new Error("You must implement this method in a subclass.");
    }
}

export class WebComponentHTMLElement<
    Props
> extends WebComponentHTMLElementBase {
    #props = new Observable<Props>();

    static get observedAttributes() {
        return ["data"];
    }

    protected get props() {
        return this.#props;
    }

    protected get reactComponent(): React.ComponentType<Props> {
        throw new Error("You must implement this method in a subclass.");
    }

    renderReactComponent() {
        return (
            <PropsProvider Component={this.reactComponent} observable={this.props} />
        );
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (WebComponentHTMLElement.observedAttributes.includes(name) && oldValue !== newValue) {
            this.data = JSON.parse(newValue);
        }
    }

    get data(): Props | undefined {
        return this.#props.value;
    }

    set data(value: Props) {
        this.#props.value = value;
    }
}
