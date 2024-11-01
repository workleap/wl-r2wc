import type { WebComponentHTMLElement } from "@workleap/r2wc";
import type { MovieWidgets } from "../../widgets.ts";

declare global {

    interface Window {
        MovieWidgets?: typeof MovieWidgets;
    }

    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "wl-movie-pop-up": WebComponentHTMLElement ;
            "wl-movie-details": WebComponentHTMLElement;
            "wl-movie-finder": WebComponentHTMLElement;
            "wl-ticket": WebComponentHTMLElement;
            "wl-selected-movie": WebComponentHTMLElement;
        }
    }
}

export { };
