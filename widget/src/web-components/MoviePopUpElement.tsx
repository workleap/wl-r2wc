import { Observable } from "../r2wc/Observable.ts";
import { PropsProvider } from "../r2wc/PropsProvider.tsx";
import { WebComponentHTMLElementBase } from "../r2wc/WebComponentHTMLElement.tsx";
import { MoviePopup, type MoviePopupProps } from "../react/MoviePopup.tsx";

export type MoviePopUpElementProps = MoviePopupProps;
export class MoviePopUpElement extends WebComponentHTMLElementBase {
    #props = new Observable<MoviePopUpElementProps>();

    static get tagName() {
        return "wl-movie-pop-up";
    }

    static get observedAttributes() {
        return ["text"];
    }

    get reactComponent() {
        return <PropsProvider Component={MoviePopup} observable={this.#props} />;
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue !== newValue) {
            switch (name) {
                case "text":
                    this.#props.value = {
                        ...this.#props.value,
                        text: newValue ?? ""
                    };
                    break;
                default:
                    throw new Error(`Unhandled attribute: ${name}`);
            }
        }
    }
}
