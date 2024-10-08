import {
    Avatar,
    IconButton,
    Item,
    Menu,
    MenuTrigger
} from "@workleap/orbiter-ui";
import { type MovieData, useAppContext } from "./AppContextProvider.tsx";


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
    const { isMovieFinderOpen, setIsMovieFinderOpen, setSelectedMovie, setIsMovieDetailsOpen } = useAppContext();


    const handleSelectionChange = (event: React.SyntheticEvent, keys: string[]) => {
        if (keys.length === 0) {
            setIsMovieDetailsOpen(false);
            setSelectedMovie(null);
        } else {
            setSelectedMovie(movies.find(movie => movie.key === keys[0]) ?? null);
            setIsMovieDetailsOpen(true);
        }
        setIsMovieFinderOpen(false);
    };

    return (
        <MenuTrigger open={isMovieFinderOpen} >
            <IconButton aria-label="View movies" style={{ position:"fixed", bottom:"20px", right:"20px" }} onClick={() => {setIsMovieFinderOpen(true);}}>
                <Avatar size="2xl" name="⚡" />
            </IconButton>
            <Menu onSelectionChange={handleSelectionChange }>
                {movies.map(movie => (
                    <Item key={movie.key}>{movie.title}</Item>
                ))}
            </Menu>
        </MenuTrigger>
    );
}
