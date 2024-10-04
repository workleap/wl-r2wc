import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface MovieWidgetsConfig<ContextProps> {
    initialize: (props?: ContextProps) => void;
    update: (props: ContextProps) => void;
    getConfig: ()=>ContextProps;
}

interface AppContextProviderProps {
    theme: "light" | "dark" | "system";
}
declare global {
    interface Window {
        MovieWidgets?: MovieWidgetsConfig<AppContextProviderProps>;
    }
}

export function MainPage() {
    const webComponentRef = useRef<HTMLElement>(null);


    useEffect(() => {
        const webComponent = webComponentRef.current;
        const onCustomEvent = () => {
            const newWidget = document.createElement("wl-movie-pop-up");
            document.getElementById("dynamincWidgetArea")?.appendChild(newWidget);
        };

        // Add event listener
        webComponent?.addEventListener("on-add-item", onCustomEvent);

        // Cleanup function to remove event listener
        return () => {
            webComponent?.removeEventListener("on-add-item", onCustomEvent);
        };
    });

    return (<>
        <header style={{ backgroundColor:"lightblue", padding: "5px" }}>
            <h1>Welcome to the Movie App</h1>
            <Link to="/store">Goto Online Store</Link>
        </header>
        <div style={{ display: "flex" }}>
            <div style={{
                flex: 1,
                margin: "50px",
                border: "5px solid gray",
                padding: "5px"
            }}
            >
                <h3 style={{ textAlign: "center" }}> Widget Area</h3>
                <wl-movie-details onClick={() => console.log("hello")} show-ranking="true" ref={webComponentRef} ></wl-movie-details>
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}>Host app area</h3>
                <button type="button"
                    onClick={() => {
                        // const node = document.getElementById("context1")!;
                        // node.data = { theme : node?.data?.theme === "light" ? "dark" : "light" };

                        const oldTheme = window.MovieWidgets?.getConfig().theme;

                        window.MovieWidgets?.update({ theme:oldTheme === "light" ? "dark" : "light" });
                    }}
                >ChangeTheme!</button>
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}> Widget Area</h3>
                <wl-movie-pop-up text="Click Me!!"></wl-movie-pop-up>
            </div>
        </div>
        <div style={{ flex: 1, margin: "50px", border: "5px solid gray", padding: "5px" }} id="dynamincWidgetArea">
            <h3 style={{ textAlign: "center" }}> Dyanimc Widget Area</h3>

        </div>
    </>
    );
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "wl-movie-pop-up": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                text?: string;
            },
            HTMLElement
            >;

            "wl-movie-details": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                "show-ranking"?: string;
                "on-add-item"?: EventListener;
            },
            HTMLElement
            >;

            "wl-movie-context": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                theme?: string;
            },
            HTMLElement
            >;
        }
    }
}
