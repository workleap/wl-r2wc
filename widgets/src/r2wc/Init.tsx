import type { ComponentType, PropsWithChildren } from "react";
import { createRoot } from "react-dom/client";
import type { WebComponentHTMLElementBase } from "./WebComponentHTMLElement.tsx";

type WebComponentHTMLElementType = typeof WebComponentHTMLElementBase;
const registeredWidgets: WebComponentHTMLElementType[] = [];
const activeWidgets = new Set<WebComponentHTMLElementBase>();

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


export function notify(element: WebComponentHTMLElementBase, event: "connected" | "disconnected") {
    if (event === "connected") {
        activeWidgets.add(element);
    } else {
        activeWidgets.delete(element);
    }
    widgetConfig?.render();
}

const container = createRoot(document.createElement("div"));

export function render(ContextProvider: ComponentType<PropsWithChildren> | undefined) {
    const portals = [];

    console.log("rendered!->", activeWidgets.size);

    for (const element of activeWidgets) {
        portals.push(element.renderedPortal);
    }

    const content = ContextProvider == null ? <>{portals}</> : <ContextProvider>{portals}</ContextProvider>;

    container.render(content);
}


let initialized = false;
let widgetConfig: WidgetsConfig | null = null;

export function buildWidgetsConfig({ elements, contextProvider }: {
    elements: WebComponentHTMLElementType[];
    contextProvider?: ComponentType<PropsWithChildren>;
}) : WidgetsConfig {
    widgetConfig = {
        initialize: () => {
            if (!initialized) {
                initialized = true;
                register(elements);
                //render(contextProvider);
            }
        },
        render: () => {
            render(contextProvider);
        }
    };

    return widgetConfig;
}

export interface WidgetsConfig {
    initialize: () => void;
    render: () => void;
}
