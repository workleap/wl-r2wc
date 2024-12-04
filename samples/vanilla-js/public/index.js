import { MovieWidgets } from "/cdn/movie-widgets/index.js";

MovieWidgets.initialize({ theme: "light" });

(function init() {
    handleMovieDetailsClick();

    addEventListenerOnChangeThemeButton();
})();


function buyMovie(movie, count) {
    const newTicket = document.createElement("wl-ticket");

    newTicket.setAttribute("key", movie.key);
    newTicket.setAttribute("title", movie.title);
    newTicket.setAttribute("count", count);
    newTicket.addEventListener("onRemove", function () {
        newTicket.parentNode.removeChild(newTicket);
    });

    document.getElementById("dynamincWidgetArea").appendChild(newTicket);
}

function addEventListenerOnChangeThemeButton() {
    const button = document.getElementById("changeTheme");

    button.addEventListener("click", function () {
        const oldTheme = window.MovieWidgets?.settings?.theme;
        const newTheme = oldTheme === "dark" ? "light" : "dark" ;

        document.documentElement.setAttribute("data-theme", newTheme);

        window.MovieWidgets?.update({ theme: newTheme });
    });

    const clearButton = document.getElementById("clearSelection");
    clearButton.addEventListener("click", function () {
        window.MovieWidgets?.clearSelectedMovie();
    });
}


function handleMovieDetailsClick() {
    document.getElementById("movide-details").addEventListener("on-buy", function (movie, count) {
        buyMovie(movie, count);
    });
}
