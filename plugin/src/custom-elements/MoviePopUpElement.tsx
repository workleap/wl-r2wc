import { PropsProvider, WebComponentHTMLElement } from "../web-components-utils/index.ts";
import { MoviePopup, type MoviePopupProps } from "../widgets/movie-pop-up/MoviePopup.tsx";

export class MoviePopUpElement extends WebComponentHTMLElement<MoviePopupProps> {
    get reactComponent() {
        return <PropsProvider Component={MoviePopup} observable={this.props} />;
    }

    static get tagName() {
        return "wl-movie-pop-up";
    }
}
