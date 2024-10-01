import { ThemeProvider } from "@workleap/orbiter-ui";
import { createContext, useContext, useState, type ReactNode } from "react";

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
  setIsMovieDetailsOpen: () => {},
});

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [isMovieDetailsOpen, setIsMovieDetailsOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{ theme, setTheme, isMovieDetailsOpen, setIsMovieDetailsOpen }}
    >
      <ThemeProvider colorScheme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
