import { ThemeProvider } from "@workleap/orbiter-ui";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { InvokeMethodHandler } from "./InvokeMethodHandler.ts";

export interface MovieData {
    key: string;
    title: string;
}

interface AppContextProps {
    theme: "light" | "dark" | "system";
    isMovieFinderOpen: boolean;
    setIsMovieFinderOpen: (value: boolean) => void;
    selectedMovie: MovieData | null;
    setSelectedMovie: (value: MovieData | null) => void;
    openModalHandler: InvokeMethodHandler<[string?]>;
}

const AppContext = createContext<AppContextProps | null>(null);

export interface AppSettings {
    theme: "light" | "dark" | "system";
    clearSelectedMovieHandler: InvokeMethodHandler;
}

export function AppContextProvider({ children, clearSelectedMovieHandler, ...props }: PropsWithChildren<AppSettings>) {
    const [theme, setTheme] = useState(props.theme);
    const [isMovieFinderOpen, setIsMovieFinderOpen] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieData | null>(null);
    const [openModalHandler] = useState(new InvokeMethodHandler());

    useEffect(() => {
        const clearSelectedMovie = () => setSelectedMovie(null);
        clearSelectedMovieHandler?.on(clearSelectedMovie);

        return () => {
            clearSelectedMovieHandler?.off(clearSelectedMovie);
        };
    }, [clearSelectedMovieHandler, setTheme]);


    useEffect(() => {
        setTheme(props.theme);
    }, [props.theme]);

    return (
        <AppContext.Provider
            value={{ selectedMovie, setSelectedMovie, isMovieFinderOpen, setIsMovieFinderOpen, theme, openModalHandler }}
        >
            <ThemeProvider colorScheme={theme}>
                {children}
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error("useAppContext must be used within a AppContextProvider");
    }

    return context;
}
