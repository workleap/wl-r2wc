import type { IWidgetsManager } from "@workleap/r2wc";
import type { WidgetsSettings } from "./WidgetsContextProvider.tsx";

interface Extensions {
    clearSelectedMovie: ()=> void;
}


export declare global {
    interface Window {
        MovieWidgets?: IWidgetsManager<WidgetsSettings> & Extensions;
    }
}

