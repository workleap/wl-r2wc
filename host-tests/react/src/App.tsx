function App() {
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
                <wl-movie-details show-ranking="true" ></wl-movie-details>
                <wl-movie-context id="context1" theme="dark"></wl-movie-context>
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}>Host app area</h3>
                <button id="changeTheme">ChangeTheme!</button>
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
                "text"?: string;
            },
            HTMLElement
            >;

            "wl-movie-details": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                "show-ranking"?: "true" | "false";
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