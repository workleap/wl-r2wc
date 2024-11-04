import type { IWidgetsManager } from "@workleap/r2wc";
import type { AppSettings } from "./AppContextProvider.tsx";

export declare global {
    interface Window {
        MovieWidgets?: IWidgetsManager<AppSettings>;
    }
}
