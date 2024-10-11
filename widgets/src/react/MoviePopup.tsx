import { Button, ThemeProvider } from "@workleap/orbiter-ui";
import { useAppContext } from "./AppContextProvider.tsx";

export interface MoviePopupProps {
    text: string;
}

export function MoviePopup({ text }: MoviePopupProps) {
    const { setIsMovieFinderOpen, isMovieFinderOpen } = useAppContext();
    const { theme } = useAppContext();

    const handleClick = () => {
        setIsMovieFinderOpen(!isMovieFinderOpen);
    };

    return (
        <ThemeProvider colorScheme={theme}>
            <Button onClick={handleClick} >{text}</Button>
        </ThemeProvider>
    );
}
