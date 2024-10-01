import {
    AppContextWidget,
    type AppContextWidgetProps
} from "../../react/index.ts";
import { PropsProvider, WebComponentHTMLElement } from "../utils/index.ts";

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
