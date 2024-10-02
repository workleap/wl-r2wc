
export class WebComponentHTMLElementBase extends HTMLElement {
    get reactComponent(): JSX.Element {
        throw new Error("You must implement this method in a subclass.");
    }

    static get tagName(): string {
        throw new Error("You must implement this method in a subclass.");
    }
}
