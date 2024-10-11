import { Div, ThemeProvider } from "@workleap/orbiter-ui";
import { useAppContext } from "./AppContextProvider.tsx";

export function SelectedMovie() {
    const { selectedMovie, theme } = useAppContext();

    return (
        <ThemeProvider colorScheme={theme}>
            <Div>Selected Movie: {selectedMovie ? selectedMovie.title : "-"}</Div>
        </ThemeProvider>
    );
}
