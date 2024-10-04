import type { ComponentType, PropsWithChildren } from "react";
import { createRoot } from "react-dom/client";
import type { WebComponentHTMLElementBase } from "./WebComponentHTMLElement.tsx";

type WebComponentHTMLElementType = typeof WebComponentHTMLElementBase;
const registeredWidgets: WebComponentHTMLElementType[] = [];
const activeWidgets = new Set<WebComponentHTMLElementBase>();
let initialized = false;
let widgetsConfig: WidgetsConfig | null = null;
const container = createRoot(document.createElement("div"));
let delayRendererHandle = 0;
let render: (()=>void) = () => {throw new Error("Not initialized");};

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

function delayRenderRequested() {
    return delayRendererHandle !== 0;
}

export function notify(element: WebComponentHTMLElementBase, event: "connected" | "disconnected") {
    if (event === "connected") {
        activeWidgets.add(element);
    } else {
        activeWidgets.delete(element);
    }

    // When it is not initialized, we don't need to render. The initial function will do it.
    // When a page is changed through a router, some widgets are being removed and some new widgets may be added.
    // With delay rendering we avoid uneeded multiple rendering by waiting for all the changes to be done in current thread,
    // and enqueue a render to be done at next step.
    if (initialized && !delayRenderRequested()) {
        delayRendererHandle = setTimeout(() => {
            render();
            delayRendererHandle = 0;
        });
    }
}


function renderWidgets(ContextProvider: ComponentType<PropsWithChildren> | undefined) {
    const portals = [];

    console.log("rendered!->", activeWidgets.size, "initialized->", initialized);

    for (const element of activeWidgets) {
        portals.push(element.renderedPortal);
    }

    const content = ContextProvider == null ? <>{portals}</> : <ContextProvider>{portals}</ContextProvider>;

    container.render(content);
}


export function buildWidgetsConfig({ elements, contextProvider }: {
    elements: WebComponentHTMLElementType[];
    contextProvider?: ComponentType<PropsWithChildren>;
}) : WidgetsConfig {
    render = () => {
        renderWidgets(contextProvider);
    };
    widgetsConfig = {
        initialize: () => {
            if (!initialized) {
                register(elements);
                initialized = true;
                render();
            }
        }

    };

    return widgetsConfig;
}

export interface WidgetsConfig {
    initialize: () => void;
}
