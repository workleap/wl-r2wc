import type { ComponentType, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import type { WebComponentHTMLElementBase } from "./WebComponentHTMLElement.tsx";

type WebComponentHTMLElementType = typeof WebComponentHTMLElementBase;
const registeredWidgets: WebComponentHTMLElementType[] = [];

/**
 * Registers the web components to the custom elements.
 */
export function register(
    elements: WebComponentHTMLElementType | WebComponentHTMLElementType[]
) {
    const array = Array.isArray(elements) ? elements : [elements];

    for (const element of array) {
        if (customElements.get(element.tagName)) {
            // Already defined, do nothing.
            continue;
        }

        customElements.define(element.tagName, element);
        registeredWidgets.push(element);
    }
}

function buildQuery() {
    return registeredWidgets.map(x => x.tagName).join(",");
}

export function render(ContextProvider: ComponentType<PropsWithChildren>) {
    const elements = document.querySelectorAll<WebComponentHTMLElementBase>(
        buildQuery()
    );
    const portals = [];

    for (const element of elements) {
        portals.push(createPortal(element.renderReactComponent(), element));
    }

    const root = document.createElement("div");
    const container = createRoot(root);

    container.render(<ContextProvider>{portals}</ContextProvider>);
}
