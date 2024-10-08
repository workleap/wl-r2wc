import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import {
    MovieDetails,
    type MovieDetailsProps
} from "../react/MovieDetails.tsx";

export class MovieDetailsElement extends WebComponentHTMLElement<MovieDetailsProps> {
    get reactComponent() {
        return MovieDetails;
    }

    static get tagName() {
        return "wl-movie-details";
    }

    static get observedAttributes() {
        return ["show-ranking", "on-buy"];
    }

    set data(value: MovieDetailsProps) {
        const mainOnAddItem = value.onBuy;
        value.onBuy = (count: number) => {
            mainOnAddItem?.(count);
            this.dispatchEvent(new CustomEvent("on-buy", { }));
        };


        super.data = value;
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            if (name === "show-ranking") {
                this.data = {
                    ...this.data,
                    showRanking: newValue === "true"
                };
            }
        }
    }
}
