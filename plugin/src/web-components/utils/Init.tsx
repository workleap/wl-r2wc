import type { ComponentType } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import type { WebComponentHTMLElementBase } from "./WebComponentHTMLElement.tsx";

type WebComponentHTMLElementType = typeof WebComponentHTMLElementBase;
const registeredWidgets: WebComponentHTMLElementType[] = [];

export function register(
  elements: WebComponentHTMLElementType | WebComponentHTMLElementType[]
) {
  const array = Array.isArray(elements) ? elements : [elements];

  for (const element of array) {
    if (customElements.get(element.getTagName())) {
      // Already defined, do nothing.
      return;
    }

    customElements.define(element.getTagName(), element);
    registeredWidgets.push(element);
  }
}

function buildQuery() {
  let query = "";
  for (const widget of registeredWidgets) {
    query += `${widget.getTagName()},`;
  }

  return query.slice(0, -1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function render(ContextProvider: ComponentType<any>) {
  const elements =
    document.querySelectorAll<WebComponentHTMLElementBase>(buildQuery());
  const portals = [];

  for (const element of elements) {
    portals.push(createPortal(element.getReactComponent(), element.root));
  }

  const root = document.createElement("div");
  const container = createRoot(root);

  container.render(<ContextProvider>{portals}</ContextProvider>);
}
