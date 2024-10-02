import { WebComponentHTMLElement } from "../r2wc/WebComponentHTMLElement.tsx";
import {
    AppContextWidget,
    type AppContextWidgetProps
} from "../react/AppContextWidget.tsx";

export class AppContextElement extends WebComponentHTMLElement<AppContextWidgetProps> {
    get reactComponent() {
        return AppContextWidget;
    }

    static get tagName() {
        return "wl-movie-context";
    }
}
