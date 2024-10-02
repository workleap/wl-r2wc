import { PropsProvider } from "../r2wc/PropsProvider.tsx";
import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import { MovieDetails, type MovieDetailsProps } from "../react/MovieDetails.tsx";

export class MovieDetailsElement extends WebComponentHTMLElement<MovieDetailsProps> {
    get reactComponent() {
        return <PropsProvider Component={MovieDetails} observable={this.props} />;
    }

    static get tagName() {
        return "wl-movie-details";
    }
}
