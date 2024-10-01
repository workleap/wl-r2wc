

 import { AppContextProvider } from "@workleap-movie-sample/react";
 import { register, render } from "./base/index.ts";
import { MovieDetailsElement } from "./components/MovieDetailsElement.tsx";
import { MoviePopUpElement } from "./components/MoviePopUp.tsx";

 register(MovieDetailsElement);
 register(MoviePopUpElement);
 

export function renderWidgets() {
  render(AppContextProvider);
}