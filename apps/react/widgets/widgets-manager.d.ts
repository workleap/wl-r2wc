
interface AppSettings {
    theme: "light" | "dark" | "system";
}

interface IRenderingConfig {
    createRoot: typeof CreateRootType;
    createPortal: typeof CreatePortalType;
}

interface IWidgetsManager<T> {
    initialize: (settings?: T, renderingConfig?: IRenderingConfig) => void;
    update: (settings: Partial<T>) => void;
    appSettings?: T | null;
}

export declare global {
    interface Window {
        MovieWidgets?: IWidgetsManager<AppSettings>;
    }
}


