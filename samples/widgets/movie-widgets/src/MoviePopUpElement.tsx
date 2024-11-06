import { WebComponentHTMLElement, type AttributeEventMap } from "@workleap/r2wc";
import { MoviePopup, type MoviePopupProps } from "./MoviePopup.js";

type ObservedAttributesType = (typeof MoviePopUpElement.observedAttributes)[number];

export class MoviePopUpElement extends WebComponentHTMLElement<MoviePopupProps, ObservedAttributesType> {
    static tagName = "wl-movie-pop-up";
    static observedAttributes = ["text"] as const;

    get reactComponent() {
        return MoviePopup;
    }

    get map(): AttributeEventMap<MoviePopupProps, ObservedAttributesType> {
        return {
            attributes: {
                "text": "text"
            }
        };
    }
}


