import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import { SelectedMovie } from "../react/SelectedMovie.tsx";


export class SelectedMovieElement extends WebComponentHTMLElement {
    get reactComponent() {
        return SelectedMovie;
    }

    static get tagName() {
        return "wl-selected-movie";
    }
}
