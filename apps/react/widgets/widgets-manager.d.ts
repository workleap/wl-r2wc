
interface AppSettings {
    theme: "light" | "dark" | "system";
}

interface IWidgetsManager<T> {
    initialize: (settings?: T) => void;
    update: (settings: Partial<T>) => void;
    appSettings?: T | null;
}

interface MovieWidgets {
    MovieWidgets?: IWidgetsManager<AppSettings>;
}
