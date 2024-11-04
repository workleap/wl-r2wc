import { WidgetsManager } from "@workleap/r2wc";
import { AppContextProvider } from "./AppContextProvider.tsx";
import { MovieDetailsElement } from "./MovieDetailsElement.tsx";
import { MovieFinderElement } from "./MovieFinderElement.tsx";
import { MoviePopUpElement } from "./MoviePopUpElement.tsx";
import { SelectedMovieElement } from "./SelectedMovieElement.tsx";
import { TicketElement } from "./TicketElement.tsx";

const MovieWidgets = new WidgetsManager({
    elements: [MovieDetailsElement, MoviePopUpElement, MovieFinderElement, SelectedMovieElement, TicketElement],
    contextProvider: AppContextProvider
});

window.MovieWidgets = MovieWidgets;

export { MovieWidgets };
