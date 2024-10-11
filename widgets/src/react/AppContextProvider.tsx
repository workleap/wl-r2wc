import { ThemeProvider } from "@workleap/orbiter-ui";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

export interface MovieData {
    key: string;
    title: string;
}


type EventCallback = (...args: unknown[]) => void;

type EventName = "movieSelected";

export class EventEmitter {
    private events: { [key: string]: EventCallback[] } = {};

    on(event: EventName, callback: EventCallback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    off(event: EventName, callback: EventCallback) {
        if (!this.events[event]) {return;}
        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }

    emit(event: EventName, ...args: unknown[]) {
        if (!this.events[event]) {return;}
        this.events[event].forEach(callback => callback(...args));
    }
}

interface AppContextProps {
    theme: "light" | "dark" | "system";
    isMovieFinderOpen: boolean;
    setIsMovieFinderOpen: (value: boolean) => void;
    selectedMovie: MovieData | null;
    setSelectedMovie: (value: MovieData | null) => void;
    eventEmitter: EventEmitter;

}

const AppContext = createContext<AppContextProps | null>(null);

export interface AppSettings {
    theme: "light" | "dark" | "system";
}

export function AppContextProvider({ children, ...props }: PropsWithChildren<AppSettings>) {
    const [theme, setTheme] = useState(props.theme);
    const [isMovieFinderOpen, setIsMovieFinderOpen] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieData | null>(null);
    const [eventEmitter] = useState(new EventEmitter());


    useEffect(() => {
        setTheme(props.theme);
    }, [props.theme]);

    return (
        <AppContext.Provider
            value={{ selectedMovie, setSelectedMovie, isMovieFinderOpen, setIsMovieFinderOpen, theme, eventEmitter }}
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
