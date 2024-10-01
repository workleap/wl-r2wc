import { MoviePopup, MoviePopupProps } from "@workleap-movie-sample/react";
import { PropsProvider, WebComponentHTMLElement } from "../base/index.ts";

export class MoviePopUpElement extends WebComponentHTMLElement<MoviePopupProps> {
  getReactComponent() {
    return <PropsProvider Component={MoviePopup} observable={this.props} />;
  }

  static getTagName() {
    return "wl-movie-pop-up";
  }
}
