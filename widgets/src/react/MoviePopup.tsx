import { Button, Div, ThemeProvider } from "@workleap/orbiter-ui";
import { useAppContext } from "./AppContextProvider.tsx";

export interface MoviePopupProps {
    text: string;
}

export function MoviePopup({ text }: MoviePopupProps) {
    const { setIsMovieDetailsOpen } = useAppContext();
    const { theme } = useAppContext();

    const handleClick = () => {
        setIsMovieDetailsOpen(true);
    };

    return (
        <ThemeProvider colorScheme={theme}>
            <Button onClick={handleClick}>{text}</Button>
            <Div>Selected Theme: {theme}</Div>
            <hr />
        </ThemeProvider>
    );
}
