import { register, render } from "../r2wc/Init.tsx";
import { AppContextProvider } from "../react/AppContextProvider.tsx";
import { MovieDetailsElement } from "./MovieDetailsElement.tsx";
import { MoviePopUpElement } from "./MoviePopUpElement.tsx";

let initialized = false;

function initialize(config: MovieWidgetsSettings) {
    if (!initialized) {
        initialized = true;
        register([MovieDetailsElement, MoviePopUpElement]);
        const appContextProviderProps = config;
        render(AppContextProvider, appContextProviderProps);
    }
}

function update(config: MovieWidgetsSettings) {
    console.log("update", config);
    const appContextProviderProps = config;
    render(AppContextProvider, appContextProviderProps);
}

export interface MovieWidgetsSettings {
    theme: "light" | "dark" | "system";
}

/**
 * This is the widget's API. It will be exposed to the host application once the widget is loaded.
 * The host application will have access to the all the properties and methods defined in this object via the window object.
 * @example window.MovieWidgets.initialize()
 */
export interface MovieWidgetsConfig {
    initialize: (config: MovieWidgetsSettings) => void;
    update: (config: MovieWidgetsSettings) => void;
}

declare global {
    interface Window {
        MovieWidgets?: MovieWidgetsConfig;
    }
}


window.MovieWidgets = {
    initialize,
    update
};


