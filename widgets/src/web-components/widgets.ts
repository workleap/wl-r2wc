import { buildWidgetsConfig, type WidgetsConfig } from "../r2wc/Init.tsx";
import { AppContextProvider } from "../react/AppContextProvider.tsx";
import { AppContextElement } from "./AppContextElement.tsx";
import { MovieDetailsElement } from "./MovieDetailsElement.tsx";
import { MoviePopUpElement } from "./MoviePopUpElement.tsx";


/**
 * This is the widget's API. It will be exposed to the host application once the widget is loaded.
 * The host application will have access to the all the properties and methods defined in this object via the window object.
 * @example window.MovieWidgets.initialize()
 */


declare global {
    interface Window {
        MovieWidgets?: WidgetsConfig;
    }
}


window.MovieWidgets = buildWidgetsConfig({
    elements: [MovieDetailsElement, MoviePopUpElement, AppContextElement],
    contextProvider: AppContextProvider
});


