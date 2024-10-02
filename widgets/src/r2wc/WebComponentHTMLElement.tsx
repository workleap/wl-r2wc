import { Observable } from "./Observable.ts";
import { PropsProvider } from "./PropsProvider.tsx";

export class WebComponentHTMLElementBase extends HTMLElement {
    #root = null as HTMLDivElement | null;

    renderReactComponent(): JSX.Element {
        throw new Error("You must implement this method in a subclass.");
    }

    static get tagName(): string {
        throw new Error("You must implement this method in a subclass.");
    }
    get root(): HTMLDivElement {
        if (!this.#root) {
            throw new Error("Root element is not yet created.");
        }

        return this.#root;
    }

    protected set root(value: HTMLDivElement) {
        this.#root = value;
    }
}

export class WebComponentHTMLElement<
    Props
> extends WebComponentHTMLElementBase {
    #props = new Observable<Props>();

    static get observedAttributes() {
        return ["data"];
    }

    connectedCallback() {
        const root = document.createElement("div");
        this.appendChild(root);

        this.root = root;
    }

    protected get props() {
        return this.#props;
    }

    set data(value: Props) {
        this.#props.value = value;
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
        if (name === "data" && oldValue !== newValue) {
            this.data = JSON.parse(newValue);
        }
    }

    get data(): Props | undefined {
        return this.#props.value;
    }
}
