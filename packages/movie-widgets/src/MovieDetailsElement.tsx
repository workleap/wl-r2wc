
import { WebComponentHTMLElement, type AttributeEventMap } from "@workleap/r2wc";
import {
    MovieDetails,
    type MovieDetailsProps
} from "./MovieDetails.tsx";

type ObservedAttributesType = (typeof MovieDetailsElement.observedAttributes)[number];
export class MovieDetailsElement extends WebComponentHTMLElement<MovieDetailsProps, ObservedAttributesType> {
    static tagName = "wl-movie-details";
    static observedAttributes = ["show-ranking", "mode"] as const;

    get reactComponent() {
        return MovieDetails;
    }

    get map(): AttributeEventMap<MovieDetailsProps, ObservedAttributesType> {
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


