import { Button, Div } from "@workleap/orbiter-ui";
import { useAppContext } from "../../context-provider/ContextProvider.tsx";

export interface TriggerProps {
  text: string;
}

export function Popup({ text }: TriggerProps) {
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
