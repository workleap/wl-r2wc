import {
    AppContextWidget,
    type AppContextWidgetProps
} from "../../react/index.ts";
import { PropsProvider, WebComponentHTMLElement } from "../utils/index.ts";

export class AppContextElement extends WebComponentHTMLElement<AppContextWidgetProps> {
    get reactComponent() {
        return (
            <PropsProvider Component={AppContextWidget} observable={this.props} />
        );
    }

    static get tagName() {
        return "wl-movie-context";
    }
}
