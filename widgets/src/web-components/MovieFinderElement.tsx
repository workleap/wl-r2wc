import { WebComponentHTMLElement } from "@workleap/r2wc/core";
import { MovieFinder } from "../react/MovieFinder.tsx";

export class MovieFinderElement extends WebComponentHTMLElement {
    get reactComponent() {
        return MovieFinder;
    }

    static get tagName() {
        return "wl-movie-finder";
    }
}
