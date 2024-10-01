import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { WebComponentHTMLElementBase } from "./WebComponentHTMLElement.tsx";
import { ComponentType } from "react";

type WebComponentHTMLElementType = typeof WebComponentHTMLElementBase;
const registeredWidgets: WebComponentHTMLElementType[] = [];

export function register(element: WebComponentHTMLElementType) {
  if (customElements.get(element.getTagName())) {
    // Already defined, do nothing.
    return;
  }

  customElements.define(element.getTagName(), element);
  registeredWidgets.push(element);
}

function buildQuery() {
  let query = "";
  for (const widget of registeredWidgets) {
    query += `${widget.getTagName()},`;
  }

  return query.slice(0, -1);
}

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
