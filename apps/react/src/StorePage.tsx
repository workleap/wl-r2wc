import { MovieDetails, SelectedMovie } from "./web-componenets.tsx";

export function StorePage() {
    return (<>

        <div style={{ display: "flex" }}>
            <div style={{
                flex: 1,
                margin: "50px",
                border: "5px solid gray",
                padding: "5px"
            }}
            >
                <h3 style={{ textAlign: "center" }}> Widget Area</h3>
                <SelectedMovie style={{ fontWeight:"bold" }}></SelectedMovie>
                <MovieDetails data={{ showRanking:false, mode: "inline" }} ></MovieDetails>

            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}>Host app area</h3>
                <div style={{ textAlign: "center" }}>
                    <h3>Items for Sale</h3>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li style={{ margin: "20px 0", border: "1px solid gray", padding: "10px", borderRadius: "5px" }}>
                            <h4>T-Shirt</h4>
                            <p>Comfortable cotton t-shirt</p>
                            <button type="button" style={{ padding: "5px 10px", border: "none", borderRadius: "3px" }}>N/A</button>
                        </li>
                        <li style={{ margin: "20px 0", border: "1px solid gray", padding: "10px", borderRadius: "5px" }}>
                            <h4>Mug</h4>
                            <p>Ceramic coffee mug</p>
                            <button type="button" style={{ padding: "5px 10px", border: "none", borderRadius: "3px" }}>N/A</button>
                        </li>
                        <li style={{ margin: "20px 0", border: "1px solid gray", padding: "10px", borderRadius: "5px" }}>
                            <h4>Shoe</h4>
                            <p>Running shoe</p>
                            <button type="button" style={{ padding: "5px 10px", border: "none", borderRadius: "3px" }}>N/A</button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

    </>
    );
}

