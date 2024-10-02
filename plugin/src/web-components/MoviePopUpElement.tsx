import { PropsProvider } from "../r2wc/PropsProvider.tsx";
import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import { MoviePopup, type MoviePopupProps } from "../react/MoviePopup.tsx";

export class MoviePopUpElement extends WebComponentHTMLElement<MoviePopupProps> {
    get reactComponent() {
        return <PropsProvider Component={MoviePopup} observable={this.props} />;
    }

    static get tagName() {
        return "wl-movie-pop-up";
    }
}
