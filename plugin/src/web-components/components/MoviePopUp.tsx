import { MoviePopup, type MoviePopupProps } from "../../react/index.ts";
import { PropsProvider, WebComponentHTMLElement } from "../utils/index.ts";

export class MoviePopUpElement extends WebComponentHTMLElement<MoviePopupProps> {
    get reactComponent() {
        return <PropsProvider Component={MoviePopup} observable={this.props} />;
    }

    static get tagName() {
        return "wl-movie-pop-up";
    }
}
