import { MovieDetails, type MovieDetailsProps } from "../../react/index.ts";
import { PropsProvider, WebComponentHTMLElement } from "../utils/index.ts";

export class MovieDetailsElement extends WebComponentHTMLElement<MovieDetailsProps> {
    get reactComponent() {
        return <PropsProvider Component={MovieDetails} observable={this.props} />;
    }

    static get tagName() {
        return "wl-movie-details";
    }
}
