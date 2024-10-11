import { ThemeProvider } from "@workleap/orbiter-ui";
import { createContext, useContext, useState, type PropsWithChildren } from "react";

interface AppContextProps {
    theme: "light" | "dark" | "system";
    setTheme: (value: "light" | "dark" | "system") => void;}


const AppContext = createContext<AppContextProps>({
    theme: "light",
    setTheme: () => {}
});


export function AppContextProvider({ children }: PropsWithChildren) {
    const [theme, setTheme] = useState< "light" | "dark" | "system">("light");


    return (
        <AppContext.Provider
            value={{ theme, setTheme }}
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
