import { useEffect, useRef } from "react";

// we should get all ths types from the widgets project
export interface MovieDetailsProps {
    showRanking: boolean;
    onBuy?: (movie : MovieData, count: number) => void;
    mode: "modal" | "inline";
}

export interface MovieData {
    key: string;
    title: string;
}

export interface TicketProps {
    key: string;
    title: string;
    count: number;
    onRemove: ()=> void;
}

export interface MoviePopupProps {
    text: string;
}


export class WebComponentHTMLElementBase<Props> extends HTMLElement {
    #props: { value: Props | undefined } = { value: undefined };

    get data(): Props | undefined {
        return this.#props.value;
    }

    set data(value: Props) {
        this.#props.value = value;
    }
}

export function MovieDetails(props: MovieDetailsProps) {
    const { ...rest } = props;
    const ref = useRef<WebComponentHTMLElementBase<MovieDetailsProps>>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.data = rest;
        }
    }, [rest]);

    return <wl-movie-details ref={ref} />;
}

export function Ticket(props: TicketProps) {
    const { ...rest } = props;
    const ref = useRef<WebComponentHTMLElementBase<TicketProps>>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.data = rest;
        }
    }, [rest]);

    return <wl-ticket ref={ref} />;
}

export function SelectedMovie() {
    const ref = useRef<WebComponentHTMLElementBase<unknown>>(null);

    // useEffect(() => {
    //     if (ref.current) {
    //         ref.current.data = rest;
    //     }
    // }, [rest]);

    return <wl-selected-movie ref={ref} />;
}

export function MovieFinder() {
    const ref = useRef<WebComponentHTMLElementBase<unknown>>(null);

    // useEffect(() => {
    //     if (ref.current) {
    //         ref.current.data = rest;
    //     }
    // }, [rest]);

    return <wl-movie-finder ref={ref} />;
}

export function MoviePopup(props: { data: MoviePopupProps } & React.HTMLAttributes<HTMLElement>) {
    const { data, ...rest } = props;
    const ref = useRef<WebComponentHTMLElementBase<MoviePopupProps>>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.data = data;
        }
    }, [data]);

    return <wl-movie-pop-up ref={ref} {...rest} />;
}
