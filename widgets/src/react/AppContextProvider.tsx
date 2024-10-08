import { ThemeProvider } from "@workleap/orbiter-ui";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

interface AppContextProps {
    theme: "light" | "dark" | "system";
    isMovieDetailsOpen: boolean;
    setIsMovieDetailsOpen: (value: boolean) => void;
}

const AppContext = createContext<AppContextProps>({
    theme: "light",
    isMovieDetailsOpen: false,
    setIsMovieDetailsOpen: () => {}
});

export interface AppSettings {
    theme: "light" | "dark" | "system";
}

export function AppContextProvider({ children, ...props }: PropsWithChildren<AppSettings>) {
    const [theme, setTheme] = useState(props.theme);
    const [isMovieDetailsOpen, setIsMovieDetailsOpen] = useState<boolean>(false);

    useEffect(() => {
        setTheme(props.theme);
    }, [props.theme]);

    return (
        <AppContext.Provider
            value={{ isMovieDetailsOpen, setIsMovieDetailsOpen, theme }}
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
