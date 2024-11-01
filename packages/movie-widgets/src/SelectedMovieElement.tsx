import { WebComponentHTMLElement } from "@workleap/r2wc";
import { SelectedMovie } from "./SelectedMovie.tsx";


export class SelectedMovieElement extends WebComponentHTMLElement {
    get reactComponent() {
        return SelectedMovie;
    }

    get initialStyle(): Partial<CSSStyleDeclaration> {
        return {
            fontWeight: "900"
        };
    }

    static get tagName() {
        return "wl-selected-movie";
    }
}
