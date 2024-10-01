import { useEffect } from "react";
import { useAppContext } from "../../context-provider/ContextProvider.js";

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
