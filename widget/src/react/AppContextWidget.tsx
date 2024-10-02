import { useEffect } from "react";
import { useAppContext } from "./AppContextProvider.tsx";

export interface AppContextWidgetProps {
    theme: "light" | "dark" | "system";
}

export function AppContextWidget({ theme }: AppContextWidgetProps) {
    const { setTheme } = useAppContext();

    useEffect(() => {
        setTheme(theme);
    });

    return <></>;
}
