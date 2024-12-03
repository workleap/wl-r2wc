import { MovieDetails, SelectedMovie } from "@samples/movie-widgets/react";
import { Checkbox } from "@workleap/orbiter-ui";
import { useState } from "react";

export function StorePage() {
    const [showRanking, setShowRanking] = useState(false);

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
                <div style={{ marginBottom: "15px" }}>
                    <Checkbox style={{ marginBottom: "15px", float: "right" }} onChange={() => {setShowRanking(!showRanking);}} >Show Ranking</Checkbox>
                    <SelectedMovie style={{ fontWeight:"bold" }} />
                </div>

                <MovieDetails data={{ showRanking, mode: "inline" }} />

            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}>Host App Area</h3>
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

