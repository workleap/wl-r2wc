import { useEffect, useState } from "react";

interface MovieWidgetsConfig {
    initialize: (config: { theme: string }) => void;
    update: (config: { theme: string }) => void;
}

declare global {
    interface Window {
        MovieWidgets?: MovieWidgetsConfig;
    }
}
const DefaultTheme = "dark";
function App() {
    const [theme, setTheme] = useState(DefaultTheme);

    useEffect(() => {
        window.MovieWidgets?.initialize({ theme: DefaultTheme });
    }, []);

    const handleThemeChange = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        window.MovieWidgets?.update({ theme: newTheme });
        setTheme(newTheme);
    };

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
                <wl-movie-details onClick={() => console.log("hello")} show-ranking="true" ></wl-movie-details>
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}>Host app area</h3>
                <button type="button" onClick={handleThemeChange}>ChangeTheme!</button>
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}> Widget Area</h3>
                <wl-movie-pop-up text="Click Me!!"></wl-movie-pop-up>
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
        }
    }
}