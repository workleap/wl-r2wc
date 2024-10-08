import { ThemeProvider } from "@workleap/orbiter-ui";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

export interface MovieData {
    key: string;
    title: string;
}

interface AppContextProps {
    theme: "light" | "dark" | "system";
    isMovieFinderOpen: boolean;
    setIsMovieFinderOpen: (value: boolean) => void;
    isMovieDetailsOpen: boolean;
    setIsMovieDetailsOpen: (value: boolean) => void;
    selectedMovie: MovieData | null;
    setSelectedMovie: (value: MovieData | null) => void;
}

const AppContext = createContext<AppContextProps>({
    theme: "light",
    isMovieFinderOpen: false,
    setIsMovieFinderOpen: () => {},
    isMovieDetailsOpen: false,
    setIsMovieDetailsOpen: () => {},
    selectedMovie: null,
    setSelectedMovie: () => {}
});

export interface AppSettings {
    theme: "light" | "dark" | "system";
}

export function AppContextProvider({ children, ...props }: PropsWithChildren<AppSettings>) {
    const [theme, setTheme] = useState(props.theme);
    const [isMovieFinderOpen, setIsMovieFinderOpen] = useState<boolean>(false);
    const [isMovieDetailsOpen, setIsMovieDetailsOpen] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieData | null>(null);

    useEffect(() => {
        setTheme(props.theme);
    }, [props.theme]);

    return (
        <AppContext.Provider
            value={{ selectedMovie, setSelectedMovie, isMovieFinderOpen, setIsMovieFinderOpen, theme, isMovieDetailsOpen, setIsMovieDetailsOpen }}
        >
            <ThemeProvider colorScheme={theme}>
                {children}
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
