import type { Map } from "../r2wc/utils.ts";
import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import {
    MovieDetails,
    type MovieDetailsProps
} from "../react/MovieDetails.tsx";

type ObservedAttributesType = (typeof MovieDetailsElement.observedAttributes)[number];
export class MovieDetailsElement extends WebComponentHTMLElement<MovieDetailsProps, ObservedAttributesType> {
    static tagName = "wl-movie-details";
    static observedAttributes = ["show-ranking", "mode"] as const;

    get reactComponent() {
        return MovieDetails;
    }

    get map(): Map<MovieDetailsProps, ObservedAttributesType> {
        return {
            attributes: {
                "show-ranking": { to: "showRanking", convert: value => value === "true" },
                "mode": "mode"
            },
            events: {
                "on-buy": "onBuy"
            }
        };
    }
}


