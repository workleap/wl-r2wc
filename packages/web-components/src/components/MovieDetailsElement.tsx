import { MovieDetails, MovieDetailsProps } from "@workleap-movie-sample/react";
import { PropsProvider, WebComponentHTMLElement } from "../base/index.ts";

export class MovieDetailsElement extends WebComponentHTMLElement<MovieDetailsProps> {
  getReactComponent() {
    return <PropsProvider Component={MovieDetails} observable={this.props} />;
  }

  static getTagName() {
    return "wl-movie-details";
  }
}
