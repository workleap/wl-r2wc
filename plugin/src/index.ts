import { AppContextProvider } from "./context-provider/ContextProvider.tsx";
import { AppContextElement } from "./custom-elements/AppContextElement.tsx";
import { MovieDetailsElement } from "./custom-elements/MovieDetailsElement.tsx";
import { MoviePopUpElement } from "./custom-elements/MoviePopUpElement.tsx";
import "./main.css";
import { register, render } from "./web-components-utils/index.ts";

function initialize() {
    register([MovieDetailsElement, MoviePopUpElement, AppContextElement]);
    render(AppContextProvider);
}

/**
 * This is the plugin's API. It will be exposed to the host application once the plugin is loaded.
 * The host application will have access to the all the properties and methods defined in this object via the window object.
 * @example window.MoviePlugin.initialize()
 */
export interface MovieWidgetsConfig {
    initialize: () => void;
}

declare global {
    interface Window {
        MoviePlugin?: MovieWidgetsConfig;
    }
}


window.MoviePlugin = {
    initialize
};


