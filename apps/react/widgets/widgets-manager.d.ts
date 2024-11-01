import type { WidgetsManager } from "@workleap/r2wc";

interface AppSettings {
    theme: "light" | "dark" | "system";
}

export declare global {
    interface Window {
        MovieWidgets?: WidgetsManager<AppSettings>;
    }
}
