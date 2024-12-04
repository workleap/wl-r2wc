import { WidgetsManager } from "@workleap/r2wc";
import { InvokeMethodHandler } from "./InvokeMethodHandler.ts";
import { MovieDetailsElement } from "./MovieDetailsElement.js";
import { MovieFinderElement } from "./MovieFinderElement.js";
import { MoviePopUpElement } from "./MoviePopUpElement.js";
import { SelectedMovieElement } from "./SelectedMovieElement.js";
import { TicketElement } from "./TicketElement.js";
import { WidgetsContextProvider } from "./WidgetsContextProvider.tsx";

const clearSelectedMovieHandler = new InvokeMethodHandler();

const MovieWidgets = new WidgetsManager({
    elements: [MovieDetailsElement, MoviePopUpElement, MovieFinderElement, SelectedMovieElement, TicketElement],
    contextProvider: WidgetsContextProvider,
    contextProviderProps:  {
        clearSelectedMovieHandler
    }
}).extends({
    clearSelectedMovie: clearSelectedMovieHandler.emit.bind(clearSelectedMovieHandler)
});

window.MovieWidgets = MovieWidgets;

export { MovieWidgets };
