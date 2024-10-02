import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import {
    AppContextWidget,
    type AppContextWidgetProps
} from "../react/AppContextWidget.tsx";

export type AppContextElementAttributes = AppContextWidgetProps;
export class AppContextElement extends WebComponentHTMLElement<AppContextWidgetProps, AppContextElementAttributes> {
    constructor() {
        super();
        this.customAttributes = {
            theme: "dark"
        };
    }

    get reactComponent() {
        return AppContextWidget;
    }

    static get tagName() {
        return "wl-movie-context";
    }

    static get observedAttributes() {
        return ["theme"];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            if (name === "theme") {
                this.customAttributes = {
                    ...this.customAttributes,
                    theme: newValue as AppContextWidgetProps["theme"]
                };
            }
        }
    }
}
