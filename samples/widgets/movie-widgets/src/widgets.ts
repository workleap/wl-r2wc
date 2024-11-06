import { WidgetsManager } from "@workleap/r2wc";
import { AppContextProvider } from "./AppContextProvider.js";
import { MovieDetailsElement } from "./MovieDetailsElement.js";
import { MovieFinderElement } from "./MovieFinderElement.js";
import { MoviePopUpElement } from "./MoviePopUpElement.js";
import { SelectedMovieElement } from "./SelectedMovieElement.js";
import { TicketElement } from "./TicketElement.js";

const MovieWidgets = new WidgetsManager({
    elements: [MovieDetailsElement, MoviePopUpElement, MovieFinderElement, SelectedMovieElement, TicketElement],
    contextProvider: AppContextProvider
});

window.MovieWidgets = MovieWidgets;

export { MovieWidgets };
