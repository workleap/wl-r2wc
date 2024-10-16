import type { Map } from "../r2wc/utils.ts";
import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import { MoviePopup, type MoviePopupProps } from "../react/MoviePopup.tsx";

type ObservedAttributesType = (typeof MoviePopUpElement.observedAttributes)[number];

export class MoviePopUpElement extends WebComponentHTMLElement<MoviePopupProps, ObservedAttributesType> {
    static tagName = "wl-movie-pop-up";
    static observedAttributes = ["text"] as const;

    get reactComponent() {
        return MoviePopup;
    }

    get map(): Map<MoviePopupProps, ObservedAttributesType> {
        return {
            attributes: {
                "text": "text"
            }
        };
    }
}


