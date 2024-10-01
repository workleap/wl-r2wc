import { MoviePopup, MoviePopupProps } from "../../react/index.ts";
import { PropsProvider, WebComponentHTMLElement } from "../utils/index.ts";

export class MoviePopUpElement extends WebComponentHTMLElement<MoviePopupProps> {
  getReactComponent() {
    return <PropsProvider Component={MoviePopup} observable={this.props} />;
  }

  static getTagName() {
    return "wl-movie-pop-up";
  }
}
