import type { ComponentType, PropsWithChildren } from "react";
import { createRoot } from "react-dom/client";
import type { WebComponentHTMLElementBase } from "./WebComponentHTMLElement.tsx";

type WebComponentHTMLElementType = typeof WebComponentHTMLElementBase;
const registeredWidgets: WebComponentHTMLElementType[] = [];

/**
 * Registers the web components to the custom elements.
 */
function register(
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

const container = createRoot(document.createElement("div"));

export function render(ContextProvider: ComponentType<PropsWithChildren>) {
    const elements = document.querySelectorAll<WebComponentHTMLElementBase>(
        buildQuery()
    );
    const portals = [];

    for (const element of elements) {
        portals.push(element.renderedPortal);
    }

    container.render(<ContextProvider>{portals}</ContextProvider>);
}


let initialized = false;

export function buildWidgetsConfig({ elements, contextProvider }: {
    elements: WebComponentHTMLElementType[];
    contextProvider: ComponentType<PropsWithChildren>;
}) : WidgetsConfig {
    return {
        initialize: () => {
            if (!initialized) {
                initialized = true;
                register(elements);
                render(contextProvider);
            }
        },
        render: () => {
            render(contextProvider);
        }
    };
}

export interface WidgetsConfig {
    initialize: () => void;
    render: () => void;
}
