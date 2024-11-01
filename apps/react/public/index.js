import { MovieWidgets } from "/cdn/movie-widgets/index.js";

MovieWidgets.initialize({
    theme: document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"
});
