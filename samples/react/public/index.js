
const head = document.getElementsByTagName("head")[0];

const link = document.createElement("link");
link.rel = "modulepreload";
link.href = "/cdn/movie-widgets/index.js";

head.insertBefore(link, head.firstChild);

const script = document.createElement("script");
script.src = "/cdn/movie-widgets/index.js";
script.type = "module";
script.onload = () => {
    window.MovieWidgets.initialize({
        theme: document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"
    });
};

head.appendChild(script);

