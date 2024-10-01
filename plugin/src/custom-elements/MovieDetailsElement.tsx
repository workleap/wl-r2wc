import { PropsProvider, WebComponentHTMLElement } from "../web-components-utils/index.ts";
import { MovieDetails, type MovieDetailsProps } from "../widgets/movie-details/MovieDetails.tsx";

export class MovieDetailsElement extends WebComponentHTMLElement<MovieDetailsProps> {
    get reactComponent() {
        return <PropsProvider Component={MovieDetails} observable={this.props} />;
    }

    static get tagName() {
        return "wl-movie-details";
    }
}
