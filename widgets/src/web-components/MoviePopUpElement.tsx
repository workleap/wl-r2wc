import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import { MoviePopup, type MoviePopupProps } from "../react/MoviePopup.tsx";

export class MoviePopUpElement extends WebComponentHTMLElement<MoviePopupProps> {
    get reactComponent() {
        return MoviePopup;
    }

    static get tagName() {
        return "wl-movie-pop-up";
    }
}
