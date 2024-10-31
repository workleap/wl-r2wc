import { createWebComponent } from "@workleap/r2wc/react-helpers";
import type { MovieDetailsProps, MoviePopupProps, TicketProps } from "./widgets-props.js";

export const MovieDetails = createWebComponent<MovieDetailsProps>("wl-movie-details");
export const Ticket = createWebComponent<TicketProps>("wl-ticket");
export const SelectedMovie = createWebComponent("wl-selected-movie");
export const MovieFinder = createWebComponent("wl-movie-finder");
export const MoviePopup = createWebComponent<MoviePopupProps>("wl-movie-pop-up");
