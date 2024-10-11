import { Flex } from "@workleap/orbiter-ui";
import { useEffect, useState } from "react";
import { MovieDetails, MoviePopup, SelectedMovie, Ticket } from "./web-componenets.tsx";

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
    const [boughtTickets, setBoughtTickets] = useState<{ key: string; count:number; title: string }[]>([]);

    const buyTickets = (movie: { key: string; title: string }, count: number) => {
        setBoughtTickets([...boughtTickets, {
            key: Math.random().toString(36).substring(7),
            title:movie.title,
            count: count }]);
    };

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
                <MovieDetails data={{ mode:"modal", showRanking: true, onBuy: buyTickets }}></MovieDetails>
                <SelectedMovie></SelectedMovie>
            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}>Host App Area</h3>

            </div>
            <div style={{ flex: 1, margin: "50px", border: "5px solid", padding: "5px" }}>
                <h3 style={{ textAlign: "center" }}> Widget Area</h3>
                <MoviePopup style={{ margin: "auto" }} data = {{ text : "Open Movies List" }}></MoviePopup>
            </div>
        </div>
        <div style={{ flex: 1, margin: "50px", border: "5px solid gray", padding: "5px" }}>
            <h3 style={{ textAlign: "center" }}> Dyanimc Widget Area</h3>
            <Flex style={{ flexWrap: "wrap", gap: "10px" }}>
                {boughtTickets.map(item => (<Ticket key={item.key}
                    data={{
                        key:item.key,
                        title:item.title,
                        count:item.count,
                        onRemove:() => {
                            setBoughtTickets(boughtTickets.filter(t => t.key !== item.key));
                        } }}
                ></Ticket>))}
            </Flex>
        </div>
    </>
    );
}


