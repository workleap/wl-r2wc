import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import {
    MovieDetails,
    type MovieDetailsProps
} from "../react/MovieDetails.tsx";

export class MovieDetailsElement extends WebComponentHTMLElement<MovieDetailsProps> {
    get reactComponent() {
        return MovieDetails;
    }

    static get tagName() {
        return "wl-movie-details";
    }
}
