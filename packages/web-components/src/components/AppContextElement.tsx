import {
  AppContextWidget,
  AppContextWidgetProps,
} from "@workleap-movie-sample/react";
import { PropsProvider, WebComponentHTMLElement } from "../base/index.ts";

export class AppContextElement extends WebComponentHTMLElement<AppContextWidgetProps> {
  getReactComponent() {
    return (
      <PropsProvider Component={AppContextWidget} observable={this.props} />
    );
  }

  static getTagName() {
    return "wl-movie-context";
  }
}
