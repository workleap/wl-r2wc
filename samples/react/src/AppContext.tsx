import { ThemeProvider } from "@workleap/orbiter-ui";
import { createContext, useContext, useState, type PropsWithChildren } from "react";

interface WidgetsContextProps {
    theme: "light" | "dark" | "system";
    setTheme: (value: "light" | "dark" | "system") => void;}


const AppContext = createContext<WidgetsContextProps>({
    theme: "light",
    setTheme: () => {}
});


export function WidgetsContextProvider({ children }: PropsWithChildren) {
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
