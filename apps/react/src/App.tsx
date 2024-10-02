import { useEffect, useState } from "react";

interface MovieWidgetsConfig {
    initialize: () => void;
}

declare global {
    interface Window {
        MovieWidgets?: MovieWidgetsConfig;
    }
}

function App() {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        window.MovieWidgets?.initialize();
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <div style={{
                flex: 1,
                margin: "50px",
                border: "5px solid gray",
                padding: "5px"
            }}
            >
                <h3 style={{ textAlign: "center" }}> Widget Area</h3>
                <wl-movie-details onClick={() => console.log("hello")} data={"{ \"showRanking\": \"true\" }"} ></wl-movie-details>
                <wl-movie-context data={`{"theme" : "${theme}" }`}></wl-movie-context>
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}>Host app area</h3>
                <button type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>ChangeTheme!</button>
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}> Widget Area</h3>
                <wl-movie-pop-up data='{"text": "Click Me!"}'></wl-movie-pop-up>
            </div>
        </div>
    );
}

export default App;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "wl-movie-pop-up": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                data?: string;
            },
            HTMLElement
            >;

            "wl-movie-details": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                data?: string;
            },
            HTMLElement
            >;

            "wl-movie-context": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                data?: string;
            },
            HTMLElement
            >;
        }
    }
}