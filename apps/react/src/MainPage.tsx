import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface MovieWidgetsManager<AppSettings> {
    initialize: (settings?: AppSettings) => void;
    update: (settings: Partial<AppSettings>) => void;
    appSettings: AppSettings;
}


interface AppSettings {
    theme: "light" | "dark" | "system";
}
declare global {
    interface Window {
        MovieWidgets?: MovieWidgetsManager<AppSettings>;
    }
}

export function MainPage() {
    const webComponentRef = useRef<HTMLElement>(null);
    const [dynamicWidgets, setDynamicwidgets] = useState<{ text:string; key: string }[]>([]);


    useEffect(() => {
        const webComponent = webComponentRef.current;
        const onCustomEvent = () => {
            setDynamicwidgets([...dynamicWidgets, { text: "Click me!", key: dynamicWidgets.length.toString() }]);
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
                        const oldTheme = window.MovieWidgets?.appSettings?.theme;
                        window.MovieWidgets?.update({ theme: oldTheme === "dark" ? "light" : "dark" });
                    }}
                >ChangeTheme!</button>
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}> Widget Area</h3>
                <wl-movie-pop-up text="Click Me!!"></wl-movie-pop-up>
            </div>
        </div>
        <div style={{ flex: 1, margin: "50px", border: "5px solid gray", padding: "5px" }}>
            <h3 style={{ textAlign: "center" }}> Dyanimc Widget Area</h3>
            {dynamicWidgets.map(item => (<wl-movie-pop-up key={item.key} text={item.text}></wl-movie-pop-up>))}

        </div>
    </>
    );
}


