import { Button, Div, ThemeProvider } from "@workleap/orbiter-ui";
import { useAppContext } from "../../context-provider/ContextProvider.tsx";

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
    </ThemeProvider>
  );
}
