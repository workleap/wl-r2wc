import { type MapType, WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
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

    static observedAttributes =
        ["show-ranking", "mode"];


    get attributesMap() {
        const map: MapType<MovieDetailsProps> = {
            "show-ranking": { to: "showRanking", convert: value => value === "true" },
            "on-buy": { to: "onBuy" }
        };

        return map;
    }
}
