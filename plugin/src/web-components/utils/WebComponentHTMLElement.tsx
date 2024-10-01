import { Observable } from "./Observable.ts";

export class WebComponentHTMLElementBase extends HTMLElement {
    #root = null as HTMLDivElement | null;

    getReactComponent(): JSX.Element {
        throw new Error("You must implement this method in a subclass.");
    }

    static getTagName(): string {
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

    get data(): Props | undefined {
        return this.#props.value;
    }
}
