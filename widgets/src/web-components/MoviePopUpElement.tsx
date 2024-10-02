import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import { MoviePopup, type MoviePopupProps } from "../react/MoviePopup.tsx";


interface MovieDetailsElementAttributes {
    text?: string;
}

export class MoviePopUpElement extends WebComponentHTMLElement<MoviePopupProps, MovieDetailsElementAttributes> {
    constructor() {
        super();
        this.customAttributes = {
            text: "Click"
        };
    }

    get reactComponent() {
        return MoviePopup;
    }

    static get tagName() {
        return "wl-movie-pop-up";
    }

    static get observedAttributes() {
        return ["text"];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            if (name === "text") {
                this.customAttributes = {
                    ...this.customAttributes,
                    text: newValue
                };
            }
        }
    }
}
