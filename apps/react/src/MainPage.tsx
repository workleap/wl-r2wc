import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface MovieWidgetsConfig {
    initialize: () => void;
}

declare global {
    interface Window {
        MovieWidgets?: MovieWidgetsConfig;
    }
}

export function MainPage() {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        window.MovieWidgets?.initialize();
    }, []);

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
                <wl-movie-details onClick={() => console.log("hello")} show-ranking="true" ></wl-movie-details>
                <wl-movie-context theme={theme} ></wl-movie-context>
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}>Host app area</h3>
                <button type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>ChangeTheme!</button>
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}> Widget Area</h3>
                <wl-movie-pop-up text="Click Me!!"></wl-movie-pop-up>
            </div>
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
