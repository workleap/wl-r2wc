

 import { AppContextProvider } from "@workleap-movie-sample/react";
 import { register, render } from "./base/index.ts";
import { MovieDetailsElement } from "./components/ModelDetailsElement.tsx";

 register(MovieDetailsElement);

export function renderWidgets() {
  render(AppContextProvider);
}