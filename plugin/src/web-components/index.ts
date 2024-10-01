import { AppContextProvider } from "../react/index.ts";
import { AppContextElement } from "./components/AppContextElement.tsx";
import { MovieDetailsElement } from "./components/MovieDetailsElement.tsx";
import { MoviePopUpElement } from "./components/MoviePopUp.tsx";
import { register, render } from "./utils/index.ts";

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
}


