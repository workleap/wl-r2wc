import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import {
    MovieDetails,
    type MovieDetailsProps
} from "../react/MovieDetails.tsx";

interface MovieDetailsElementAttributes {
    "show-ranking"?: string;
}
export class MovieDetailsElement extends WebComponentHTMLElement<MovieDetailsProps, MovieDetailsElementAttributes> {
    constructor() {
        super();
        this.customAttributes = {
            "show-ranking": "false"
        };
    }

    get reactComponent() {
        return MovieDetails;
    }

    static get tagName() {
        return "wl-movie-details";
    }

    static get observedAttributes() {
        return ["show-ranking"];
    }

    protected mapAttributesToProps(attributes: MovieDetailsElementAttributes): MovieDetailsProps {
        const { "show-ranking": showRanking, ...rest } = attributes;

        return {
            ...rest,
            showRanking: showRanking === "true"
        };
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            if (name === "show-ranking") {
                this.customAttributes = {
                    ...this.customAttributes,
                    "show-ranking": newValue
                };
            }
        }
    }
}
