import type { createPortal as CreatePortalType } from "react-dom";
import type { createRoot as CreateRootType, Root } from "react-dom/client";

export interface IRenderingConfig {
    createRoot: typeof CreateRootType;
    createPortal: typeof CreatePortalType;
}


export class RndererModule {
    static #root: Root | null = null;
    static #createPortal: typeof CreatePortalType | null = null;

    static get root(): Root {
        if (!this.#root) {
            throw new Error("Root has not been initialized yet.");
        }

        return this.#root;
    }

    static get createPortal(): typeof CreatePortalType {
        if (!this.#createPortal) {
            throw new Error("createPortal has not been initialized yet.");
        }

        return this.#createPortal;
    }

    static init({ createRoot, createPortal }: IRenderingConfig) {
        this.#createPortal = createPortal;

        const rootContainer = document.createElement("div");
        this.#root = createRoot(rootContainer);
    }
}
