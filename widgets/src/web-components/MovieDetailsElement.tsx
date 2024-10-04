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
        return ["show-ranking", "on-add-item"];
    }

    // protected mapAttributesToProps(attributes: MovieDetailsElementAttributes): MovieDetailsProps {
    //     const { "show-ranking": showRanking, ...rest } = attributes;

    //     return {
    //         ...rest,
    //         showRanking: showRanking === "true"
    //     };
    // }

    set data(value: MovieDetailsProps) {
        const mainOnAddItem = value.onAddItem;
        value.onAddItem = () => {
            mainOnAddItem?.();
            this.dispatchEvent(new CustomEvent("on-add-item", { }));
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
