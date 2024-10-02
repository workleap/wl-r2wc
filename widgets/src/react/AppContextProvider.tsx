import { ThemeProvider } from "@workleap/orbiter-ui";
import { createContext, useContext, useState, type ReactNode } from "react";

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

interface AppContextProviderProps {
    children?: ReactNode;
    theme?: "light" | "dark" | "system";
}

export function AppContextProvider({ theme = "light", children }: AppContextProviderProps) {
    const [isMovieDetailsOpen, setIsMovieDetailsOpen] = useState<boolean>(false);

    return (
        <AppContext.Provider
            value={{ theme, isMovieDetailsOpen, setIsMovieDetailsOpen }}
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
