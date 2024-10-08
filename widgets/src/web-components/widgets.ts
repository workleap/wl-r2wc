import { WidgetsManager } from "../r2wc/WidgetsManager.tsx";
import { AppContextProvider, type AppSettings } from "../react/AppContextProvider.tsx";
import { MovieDetailsElement } from "./MovieDetailsElement.tsx";
import { MovieFinderElement } from "./MovieFinderElement.tsx";
import { MoviePopUpElement } from "./MoviePopUpElement.tsx";
import { SelectedMovieElement } from "./SelectedMovieElement.tsx";


/**
 * This is the widget's API. It will be exposed to the host application once the widget is loaded.
 * The host application will have access to the all the properties and methods defined in this object via the window object.
 * @example window.MovieWidgets.initialize()
 */


declare global {
    interface Window {
        MovieWidgets?: WidgetsManager<AppSettings>;
    }
}


window.MovieWidgets = new WidgetsManager({
    elements: [MovieDetailsElement, MoviePopUpElement, MovieFinderElement, SelectedMovieElement],
    contextProvider: AppContextProvider
});
