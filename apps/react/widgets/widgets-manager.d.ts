import type { WidgetsManager } from "@workleap/r2wc/core";

interface AppSettings {
    theme: "light" | "dark" | "system";
}

export declare global {
    interface Window {
        MovieWidgets?: WidgetsManager<AppSettings>;
    }
}
