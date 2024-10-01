import { Button, Div } from "@workleap/orbiter-ui";
import { useAppContext } from "../../context-provider/ContextProvider.tsx";

export interface MoviePopupProps {
  text: string;
}

export function MoviePopup({ text }: MoviePopupProps) {
  const { setIsMovieDetailsOpen } = useAppContext();

  const handleClick = () => {
    setIsMovieDetailsOpen(true);
  };

  return (
    <Div>
      <Button onClick={handleClick}>{text}</Button>
    </Div>
  );
}
