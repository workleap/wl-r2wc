import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import { MovieFinder } from "../react/MovieFinder.tsx";


export class MovieFinderElement extends WebComponentHTMLElement<unknown> {
    get reactComponent() {
        return MovieFinder;
    }

    static get tagName() {
        return "wl-movie-finder";
    }
}
