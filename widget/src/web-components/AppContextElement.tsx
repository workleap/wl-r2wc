import { Observable } from "../r2wc/Observable.ts";
import { PropsProvider } from "../r2wc/PropsProvider.tsx";
import { WebComponentHTMLElementBase } from "../r2wc/WebComponentHTMLElement.tsx";
import {
    AppContextWidget,
    type AppContextWidgetProps
} from "../react/AppContextWidget.tsx";


export type AppContextElementProps = AppContextWidgetProps;

export class AppContextElement extends WebComponentHTMLElementBase {
    #props = new Observable<AppContextElementProps>();

    static get tagName() {
        return "wl-movie-context";
    }

    static get observedAttributes() {
        return ["theme"];
    }

    get reactComponent() {
        return <PropsProvider Component={AppContextWidget} observable={this.#props}/>;
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue !== newValue) {
            if (name === "theme") {
                if (newValue !== "light" && newValue !== "dark" && newValue !== "system") {
                    throw new Error(`Invalid theme: ${newValue}, expected values are "light", "dark" or "system".`);
                }

                this.#props.value = {
                    ...this.#props.value,
                    theme: newValue
                };
            }
        }
    }
}
