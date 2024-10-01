import { PropsProvider, WebComponentHTMLElement } from "../web-components-utils/index.ts";
import {
    AppContextWidget,
    type AppContextWidgetProps
} from "../widgets/app-context-widget/AppContextWidget.tsx";

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
