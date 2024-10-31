import { WebComponentHTMLElement } from "@workleap/r2wc/core";
import { SelectedMovie } from "../react/SelectedMovie.tsx";


export class SelectedMovieElement extends WebComponentHTMLElement {
    get reactComponent() {
        return SelectedMovie;
    }

    static get tagName() {
        return "wl-selected-movie";
    }
}
