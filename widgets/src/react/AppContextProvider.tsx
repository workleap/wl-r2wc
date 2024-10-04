import { ThemeProvider } from "@workleap/orbiter-ui";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AppContextProps {
    theme: "light" | "dark" | "system";
    setTheme: (theme: "light" | "dark" | "system") => void;
    isMovieDetailsOpen: boolean;
    setIsMovieDetailsOpen: (value: boolean) => void;
}

const AppContext = createContext<AppContextProps>({
    theme: "light",
    setTheme: () => {},
    isMovieDetailsOpen: false,
    setIsMovieDetailsOpen: () => {}
});

export interface AppContextProviderProps {
    theme: "light" | "dark" | "system";
}

export function AppContextProvider({ children, ...props }: AppContextProviderProps & { children?: ReactNode }) {
    const [theme, setTheme] = useState(props.theme);
    const [isMovieDetailsOpen, setIsMovieDetailsOpen] = useState<boolean>(false);
    console.log("theme", props.theme);

    // useEffect(() => {
    //     setTheme(props.theme);
    // }, [props.theme]);

    return (
        <AppContext.Provider
            value={{ theme, setTheme, isMovieDetailsOpen, setIsMovieDetailsOpen }}
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
