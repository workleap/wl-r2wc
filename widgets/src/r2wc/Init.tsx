import { Fragment, type ComponentType, type PropsWithChildren } from "react";
import { createRoot } from "react-dom/client";
import { Observable } from "./Observable.ts";
import { PropsProvider } from "./PropsProvider.tsx";
import type { WebComponentHTMLElementBase } from "./WebComponentHTMLElement.tsx";

type WebComponentHTMLElementType = typeof WebComponentHTMLElementBase;
const registeredWidgets: WebComponentHTMLElementType[] = [];
const activeWidgets: { key: number; element: WebComponentHTMLElementBase }[] = [];
let initialized = false;


let widgetsManager: WidgetsManager<unknown> | null = null;
let contextProps: Observable<unknown> | null = null;

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

export function notify(element: WebComponentHTMLElementBase, event: "connected" | "disconnected") {
    if (event === "connected") {
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


function renderContextWithProps<Props>(ContextProvider: ComponentType<PropsWithChildren<Props>>, children: React.ReactNode | undefined) {
    if (contextProps == null) {throw new Error("ContextProps is not initialized");}

    return <PropsProvider Component={ContextProvider} observable={contextProps}>
        {children}
    </PropsProvider>;
}

function renderWidgets<Props>(ContextProvider: ComponentType<PropsWithChildren<Props>> | undefined) {
    const portals = activeWidgets.map(item =>
        //this unique key is needed to avoid losing the state of the component when some adjacent elements are removed.
        <Fragment key={item.key}>
            {item.element.renderedPortal}
        </Fragment>);

    const content = ContextProvider == null ? <>{portals}</> : renderContextWithProps(ContextProvider, portals);

    root.render(content);
}


export function buildWidgetsManager<AppSettings>({ elements, contextProvider }: {
    elements: WebComponentHTMLElementType[];
    contextProvider?: ComponentType<PropsWithChildren<AppSettings>>;
}) : WidgetsManager<AppSettings> {
    render = () => {
        renderWidgets(contextProvider);
    };
    widgetsManager = {
        initialize: (settings?: AppSettings) => {
            if (!initialized) {
                contextProps = new Observable<AppSettings>() as Observable<unknown>;
                (contextProps as Observable<AppSettings>).value = settings ?? {} as AppSettings;
                register(elements);
                initialized = true;
                render();
            }
        },
        update: (settings: Partial<AppSettings>) => {
            const context = (contextProps as Observable<AppSettings>);
            context.value = {
                ...(context.value || {} as AppSettings),
                ...settings
            };
        },
        getAppSettings: () => {
            const context = (contextProps as Observable<AppSettings>);

            return context.value;
        }

    } as WidgetsManager<unknown>;

    return widgetsManager as WidgetsManager<AppSettings>;
}


export interface WidgetsManager<AppSettings> {
    initialize: (settings?: AppSettings) => void;
    update: (settings: Partial<AppSettings>) => void;
    getAppSettings: ()=> AppSettings;
}
