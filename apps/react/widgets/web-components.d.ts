export declare global {
    declare class WebComponentHTMLElement<Props= unknown> extends HTMLElement {
        get data(): Props | undefined;
        set data(value: Props);
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
