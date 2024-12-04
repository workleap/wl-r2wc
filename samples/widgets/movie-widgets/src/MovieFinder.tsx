import {
    Avatar,
    IconButton,
    Item,
    Menu,
    MenuTrigger,
    TextInput
} from "@workleap/orbiter-ui";
import { useState } from "react";
import { type MovieData, useAppContext } from "./AppContextProvider.js";


const movies : MovieData[] = [
    { key: "apollo11", title: "Apollo 11" },
    { key: "interstellar", title: "Interstellar" },
    { key: "gravity", title: "Gravity" },
    { key: "theMartian", title: "The Martian" },
    { key: "moon", title: "Moon" },
    { key: "inception", title: "Inception" },
    { key: "arrival", title: "Arrival" },
    { key: "bladeRunner2049", title: "Blade Runner 2049" },
    { key: "dune", title: "Dune" },
    { key: "starWars", title: "Star Wars" },
    { key: "starTrek", title: "Star Trek" },
    { key: "avatar", title: "Avatar" },
    { key: "guardiansOfTheGalaxy", title: "Guardians of the Galaxy" },
    { key: "matrix", title: "The Matrix" },
    { key: "terminator", title: "Terminator" }
];

export function MovieFinder() {
    const { isMovieFinderOpen, setIsMovieFinderOpen, setSelectedMovie, openModalHandler } = useAppContext();
    const [search, setSearch] = useState("");


    const handleSelectionChange = (event: React.SyntheticEvent, keys: string[]) => {
        if (keys.length === 0) {
            setSelectedMovie(null);
        } else {
            const key = keys[0].replace(/^0:/, "");
            if (key === "searchfiled") {
                return;
            }
            setSelectedMovie(movies.find(movie => movie.key === key) ?? null);
            openModalHandler.emit(key);
        }
        setIsMovieFinderOpen(false);
    };

    return (
        <MenuTrigger open={isMovieFinderOpen} >
            <IconButton aria-label="Find movies" style={{ position:"fixed", bottom:"20px", right:"20px" }} onClick={() => {setIsMovieFinderOpen(!isMovieFinderOpen);}}>
                <Avatar size="2xl" name="⚡" />
            </IconButton>
            <Menu onSelectionChange={handleSelectionChange }>
                {(search.trim().length === 0 ? movies : movies.filter(o => o.title.indexOf(search) >= 0)).map(movie => (
                    <Item key={movie.key}>{movie.title}</Item>
                ))}
                <Item key="searchfiled"><TextInput placeholder="search for movie..." fluid value={search} onValueChange={(event, value) => setSearch(value)}/></Item>
            </Menu>
        </MenuTrigger>
    );
}
