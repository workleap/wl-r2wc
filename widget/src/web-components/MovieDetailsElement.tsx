import { Observable } from "../r2wc/Observable.ts";
import { PropsProvider } from "../r2wc/PropsProvider.tsx";
import { WebComponentHTMLElementBase } from "../r2wc/WebComponentHTMLElement.tsx";
import { MovieDetails } from "../react/MovieDetails.tsx";

export interface MovieDetailsElementProps {
    "show-ranking": boolean;
}

export class MovieDetailsElement extends WebComponentHTMLElementBase {
    #props = new Observable<MovieDetailsElementProps>();

    static get tagName() {
        return "wl-movie-details";
    }

    static get observedAttributes() {
        return ["show-ranking"];
    }

    get reactComponent() {
        return <PropsProvider
            Component={MovieDetails}
            observable={this.#props}
            mapProps={
                props => ({
                    showRanking: props["show-ranking"]
                })
            } />;
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue !== newValue) {
            switch (name) {
                case "show-ranking":
                    this.#props.value = {
                        ...this.#props.value,
                        "show-ranking": newValue === "true"
                    };
                    break;
                default:
                    throw new Error(`Unhandled attribute: ${name}`);
            }
        }
    }
}
