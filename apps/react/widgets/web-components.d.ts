import type { WebComponentHTMLElement } from "@workleap/r2wc/core";

export declare global {
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
