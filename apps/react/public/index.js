import { MovieWidgets } from "/cdn/movie-widgets/index.js";
import { WorkleapHeaderManager } from "/cdn/workleap-header/index.js";

WorkleapHeaderManager.initialize();
MovieWidgets.initialize({
    theme: document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"
});
