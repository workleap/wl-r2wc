import React, { Fragment, type ComponentType } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { Observable } from "./Observable.ts";
import { PropsProvider } from "./PropsProvider.tsx";
import type { WebComponentHTMLElementBase } from "./WebComponentHTMLElement.tsx";

type WebComponentHTMLElementType = typeof WebComponentHTMLElementBase;
const registeredWidgets: WebComponentHTMLElementType[] = [];
const activeWidgets: { key: number; element: WebComponentHTMLElementBase }[] = [];
let initialized = false;

const rootContainer = document.createElement("div");
let root = createRoot(rootContainer);
let delayRendererHandle:number | null = null;
let render: (()=>void) = () => {throw new Error("WidgetsManager is not initialized yet");};
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

export function notifyWidgetMountState(element: WebComponentHTMLElementBase, event: "mounted" | "unmounted") {
    if (event === "mounted") {
        activeWidgets.push({ key: uniqueWidgetKey++, element });
    } else {
        activeWidgets.splice(activeWidgets.findIndex(x => x.element === element), 1);
    }

    // When it is not initialized, we don't need to render. The initial function will do it.
    // When a page is changed through a router, some widgets are being removed and some new widgets may be added.
    // With delay rendering we avoid uneeded multiple rendering by waiting for all the changes to be done in current thread,
    // and enqueue a render to be done at next step.
    if (initialized && !delayRenderRequested()) {
        delayRendererHandle = window.setTimeout(() => {
            render();
            delayRendererHandle = null;
        });
    }
}

interface IWidgetsManager<T> {
    initialize: (settings?: T) => void;
    update: (settings: Partial<T>) => void;
    appSettings?: T | null;
    unmount: () => void;
}

interface ConstructionOptions<T> {
    elements: WebComponentHTMLElementType[];
    contextProvider?: ComponentType<T | (T & { children?: React.ReactNode })>;
    ignoreLoadingCss?: boolean;
    syncRendering?: boolean;
}

export class WidgetsManager<AppSettings = unknown> implements IWidgetsManager<AppSettings> {
    #contextProps: Observable<AppSettings> = new Observable();
    static #instanciated = false;
    #syncRendering: boolean;

    constructor (
        { elements, contextProvider, ignoreLoadingCss = false, syncRendering = false }: ConstructionOptions<AppSettings>) {
        if (WidgetsManager.#instanciated) {throw new Error("You cannot create multiple instances of WidgetsManager");}
        WidgetsManager.#instanciated = true;

        this.#syncRendering = syncRendering;
        if (!ignoreLoadingCss) {this.#loadCssFile();}

        register(elements);
        render = () => {
            this.#renderWidgets(contextProvider);
        };
    }

    #countOccurrences(mainString: string, subString: string) {
        return mainString.split(subString).length - 1;
    }

    #loadCssFile() {
        const { url } = import.meta;
        if (url == null) {
            throw new Error("In order to load relative CSS file automatically, the WidgetsManager should be loaded as a module not regular <script/> tag. Otherwise, turn it off by setting ignoreLoadingCss: false.");
        } else if (this.#countOccurrences(url, ".js") > 1) {
            throw new Error("The WidgetsManager should be loaded from a file with only one '.js' occurrence in its path to load the CSS file automatically.");
        }

        const cssPath = url.replace(".js", ".css");
        const link = document.createElement("link");

        link.rel = "preload";
        link.as = "style";
        link.href = cssPath;
        link.onload = () => { link.rel = "stylesheet"; };

        document.head.appendChild(link);
    }

    #renderContextWithProps(ContextProvider: ComponentType<AppSettings | (AppSettings & { children?: React.ReactNode })>, children: React.ReactNode | undefined) {
        return <PropsProvider Component={ContextProvider} observable={this.#contextProps}>
            {children}
        </PropsProvider>;
    }

    #renderWidgets(contextProvider: ComponentType<AppSettings | (AppSettings & { children?: React.ReactNode })> | undefined) {
        const portals = activeWidgets.map(item =>
            //this unique key is needed to avoid loosing the state of the component when some adjacent elements are removed.
            <Fragment key={item.key}>
                {item.element.renderedPortal}
            </Fragment>);

        const content = contextProvider == null ? <>{portals}</> : this.#renderContextWithProps(contextProvider, portals);

        if (this.#syncRendering) {
            flushSync(() => {
                root.render(content);
            });
        } else {root.render(content);}
    }

    unmount() {
        root.unmount();
        root = createRoot(rootContainer);
        activeWidgets.forEach(widget => widget.element.renewPortal());
        this.#contextProps = new Observable();
        initialized = false;
    }

    initialize(settings?: AppSettings) {
        this.#contextProps.value = settings ?? {} as AppSettings;
        initialized = true;
        render();
    }

    update(settings: Partial<AppSettings>) {
        this.#contextProps.value = {
            ...this.#contextProps.value ?? {} as AppSettings,
            ...settings
        };
    }
    get appSettings() {
        return this.#contextProps.value;
    }
}
