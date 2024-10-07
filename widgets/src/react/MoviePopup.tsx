import { Button, Div, ThemeProvider } from "@workleap/orbiter-ui";
import { useState } from "react";
import { useAppContext } from "./AppContextProvider.tsx";

export interface MoviePopupProps {
    text: string;
}

export function MoviePopup({ text }: MoviePopupProps) {
    const { setIsMovieDetailsOpen } = useAppContext();
    const { theme } = useAppContext();
    const [state, setState] = useState(false);

    const handleClick = () => {
        setIsMovieDetailsOpen(true);
    };

    return (
        <ThemeProvider colorScheme={theme}>
            <Button onClick={handleClick}>{text}</Button>
            <Div>Selected Theme: {theme}</Div>
            <Div>Internal state: {state.toString()}<Button onClick={() => setState(!state)}>Change state </Button></Div>
        </ThemeProvider>
    );
}
