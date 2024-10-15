
interface AppSettings {
    theme: "light" | "dark" | "system";
}

interface IWidgetsManager<T> {
    initialize: (settings?: T) => void;
    update: (settings: Partial<T>) => void;
    appSettings?: T | null;
}

export declare global {
    interface Window {
        MovieWidgets?: IWidgetsManager<AppSettings>;
    }
}


