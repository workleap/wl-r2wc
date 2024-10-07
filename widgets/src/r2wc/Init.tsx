import { Fragment, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { Observable } from "./Observable.ts";
import { PropsProvider } from "./PropsProvider.tsx";
import type { WebComponentHTMLElementBase } from "./WebComponentHTMLElement.tsx";

type WebComponentHTMLElementType = typeof WebComponentHTMLElementBase;
const registeredWidgets: WebComponentHTMLElementType[] = [];
const activeWidgets: { key: number; element: WebComponentHTMLElementBase }[] = [];
let initialized = false;

const rootContainer = document.createElement("div");
const root = createRoot(rootContainer);
let delayRendererHandle:number | null = null;
let render: (()=>void) = () => {throw new Error("Not initialized");};
let uniqueWidgetKey:number = 1;

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
    return delayRendererHandle !== null;
}

export function notifyWidgetMount(element: WebComponentHTMLElementBase, event: "mounted" | "unmounted") {
    if (event === "mounted") {
        activeWidgets.push({ key: uniqueWidgetKey++, element });
    } else {
        activeWidgets.splice(activeWidgets.findIndex(x => x.element === element), 1);
        //const index = activeWidgets.indexOf(element);
        //activeWidgets[index] = null;
    }

    // When it is not initialized, we don't need to render. The initial function will do it.
    // When a page is changed through a router, some widgets are being removed and some new widgets may be added.
    // With delay rendering we avoid uneeded multiple rendering by waiting for all the changes to be done in current thread,
    // and enqueue a render to be done at next step.
    if (initialized && !delayRenderRequested()) {
        delayRendererHandle = setTimeout(() => {
            render();
            delayRendererHandle = null;
        });
    }
}

interface IWidgetsManager<AppSettings> {
    initialize: (settings?: AppSettings) => void;
    update: (settings: Partial<AppSettings>) => void;
    appSettings: AppSettings | undefined;
}

export class WidgetsManager<AppSettings> implements IWidgetsManager<AppSettings> {
    #contextProps: Observable<AppSettings> | null = null;

    constructor (
        { elements, contextProvider }:
        { elements: WebComponentHTMLElementType[];
            contextProvider?: ComponentType<AppSettings | (AppSettings & { children?: React.ReactNode })>;
        }) {
        if (initialized) {throw new Error("You cannot create multiple instances of WidgetsManager");}
        register(elements);
        render = () => {
            this.#renderWidgets(contextProvider);
        };
    }

    #renderContextWithProps(ContextProvider: ComponentType<AppSettings | (AppSettings & { children?: React.ReactNode })>, children: React.ReactNode | undefined) {
        if (this.#contextProps == null) {throw new Error("ContextProps is not initialized");}

        return <PropsProvider Component={ContextProvider} observable={this.#contextProps}>
            {children}
        </PropsProvider>;
    }

    #renderWidgets(contextProvider: ComponentType<AppSettings | (AppSettings & { children?: React.ReactNode })> | undefined) {
        const portals = activeWidgets.map(item =>
            //this unique key is needed to avoid losing the state of the component when some adjacent elements are removed.
            <Fragment key={item.key}>
                {item.element.renderedPortal}
            </Fragment>);

        const content = contextProvider == null ? <>{portals}</> : this.#renderContextWithProps(contextProvider, portals);

        root.render(content);
    }

    initialize (settings?: AppSettings | undefined) {
        if (!initialized) {
            this.#contextProps = new Observable(settings) ;
            initialized = true;
            render();
        }
    }

    update(settings: Partial<AppSettings>) {
        if (this.#contextProps == null) {throw new Error("you cannot call update when contextManager is not initilized yet");}
        this.#contextProps.value = {
            ...this.#contextProps.value ?? {} as AppSettings,
            ...settings
        };
    }
    get appSettings() {
        return this.#contextProps?.value;
    }
}


