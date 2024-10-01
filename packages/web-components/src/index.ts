

import { AppContextProvider } from "@workleap-movie-sample/react";
import { register, render } from "./base/index.ts";
import { MovieDetailsElement } from "./components/MovieDetailsElement.tsx";
import { MoviePopUpElement } from "./components/MoviePopUp.tsx";
import { AppContextElement } from "./components/AppContextElement.tsx";



register(MovieDetailsElement);
register(MoviePopUpElement);
register(AppContextElement);

declare global {
  interface Window {
    MovieWidgets: any;
  }
}

window.MovieWidgets = {
  initialize: () => {
    render(AppContextProvider);
  }
}


