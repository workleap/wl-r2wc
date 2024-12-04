import type { IWidgetsManager } from "@workleap/r2wc";
import type { AppSettings } from "./AppContextProvider.tsx";

interface Extensions {
    clearSelectedMovie: ()=> void;
}


export declare global {
    interface Window {
        MovieWidgets?: IWidgetsManager<AppSettings> & Extensions;
    }
}

