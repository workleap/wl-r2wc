import { MovieDetails, type MovieDetailsProps } from "../../react/index.ts";
import { PropsProvider, WebComponentHTMLElement } from "../utils/index.ts";

export class MovieDetailsElement extends WebComponentHTMLElement<MovieDetailsProps> {
    getReactComponent() {
        return <PropsProvider Component={MovieDetails} observable={this.props} />;
    }

    static getTagName() {
        return "wl-movie-details";
    }
}
