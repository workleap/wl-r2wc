import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import "./index.css";

import { createPortal } from "react-dom";

const root = createRoot(document.getElementById("root")!);

window.MovieWidgets?.initialize({
    theme: document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"
}, {
    createRoot: createRoot,
    createPortal: createPortal
});

debugger;

root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
