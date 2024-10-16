import { createElement, type HTMLAttributes, useEffect, useRef } from "react";
import type { MovieDetailsProps, MoviePopupProps, TicketProps } from "./widgets-props.js";

declare class WebComponentHTMLElement<Props= unknown> extends HTMLElement {
    get data(): Props | null| undefined;
    set data(value: Props | null | undefined);
}

function createWebComponent<Props = unknown, CustomAttributes= unknown>(tagName: keyof JSX.IntrinsicElements) {
    return function WebComponent(props: { data?: Props | null } & HTMLAttributes<HTMLElement> & CustomAttributes) {
        const { data, ...rest } = props;
        const ref = useRef <WebComponentHTMLElement<Props>>(null);

        useEffect(() => {
            if (data !== undefined && ref.current) {
                ref.current.data = data;
            }
        }, [data]);

        return createElement(tagName, { ref, ...rest });
    };
}

export const MovieDetails = createWebComponent<MovieDetailsProps>("wl-movie-details");
export const Ticket = createWebComponent<TicketProps>("wl-ticket");
export const SelectedMovie = createWebComponent("wl-selected-movie");
export const MovieFinder = createWebComponent("wl-movie-finder");
export const MoviePopup = createWebComponent<MoviePopupProps, { text?: string }>("wl-movie-pop-up");
