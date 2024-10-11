import React, { useEffect, useRef } from "react";

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

    set data(value: Props | undefined) {
        this.#props.value = value;
    }
}

function createWebComponent<Props = unknown>(tagName: keyof JSX.IntrinsicElements) {
    return function WebComponent(props: { data?: Props } & React.HTMLAttributes<HTMLElement>) {
        const { data, ...rest } = props;
        const ref = useRef<WebComponentHTMLElementBase<Props>>(null);

        useEffect(() => {
            if (ref.current) {
                ref.current.data = data;
            }
        }, [data]);

        return React.createElement(tagName, { ref, ...rest });
    };
}

export const MovieDetails = createWebComponent<MovieDetailsProps>("wl-movie-details");
export const Ticket = createWebComponent<TicketProps>("wl-ticket");
export const SelectedMovie = createWebComponent("wl-selected-movie");
export const MovieFinder = createWebComponent("wl-movie-finder");
export const MoviePopup = createWebComponent<MoviePopupProps>("wl-movie-pop-up");
