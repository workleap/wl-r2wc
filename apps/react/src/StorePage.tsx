import { Link } from "react-router-dom";

export function StorePage() {
    return (<>
        <header style={{ backgroundColor:"yellowgreen", padding: "5px" }}>
            <h1>Online Store</h1>
            <Link to="/">Home page</Link>
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
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}>Host app area</h3>
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}> Widget Area</h3>
                <wl-movie-pop-up text="Click Me!!"></wl-movie-pop-up>
            </div>
        </div>
        <wl-movie-finder></wl-movie-finder>
    </>
    );
}

