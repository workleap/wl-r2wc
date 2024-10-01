import {
  MovideDetails,
  MovideDetailsProps,
} from "@workleap-movie-sample/react";
import { PropsProvider, WebComponentHTMLElement } from "../base/index.ts";

export class MovieDetailsElement extends WebComponentHTMLElement<MovideDetailsProps> {
  getReactComponent() {
    return <PropsProvider Component={MovideDetails} observable={this.props} />;
  }

  static getTagName() {
    return "wl-movie-details";
  }
}
