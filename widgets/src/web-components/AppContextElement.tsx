import { PropsProvider } from "../r2wc/PropsProvider.tsx";
import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import {
    AppContextWidget,
    type AppContextWidgetProps
} from "../react/AppContextWidget.tsx";

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
