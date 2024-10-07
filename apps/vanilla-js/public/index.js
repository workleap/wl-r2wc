let theme = "light";

(function init() {
    window.MovieWidgets.initialize();

    initDynamicParts();
    handleMovieDetailsClick();

    updateContextData("movie-context", theme);
    addEventListenerOnChangeThemeButton();
})();

function initDynamicParts() {
    document.getElementById("addDynamicWidget").addEventListener("click", function () {
        const newWidget = document.createElement("wl-movie-pop-up");
        document.getElementById("dynamincWidgetArea").appendChild(newWidget);
    });

    document.getElementById("removeDynamicWidget").addEventListener("click", function () {
        document.getElementById("dynamincWidgetArea").querySelector("wl-movie-pop-up").remove();
    });
}

function addEventListenerOnChangeThemeButton() {
    const button = document.getElementById("changeTheme");

    button.addEventListener("click", function () {
        theme = theme === "light" ? "dark" : "light";
        updateContextData("movie-context", theme);
    });
}

function updateContextData(id, currentTheme) {
    const widget = document.getElementById(id);
    widget.setAttribute("theme", currentTheme);
}

function handleMovieDetailsClick() {
    document.getElementById("movide-details").addEventListener("on-item-add", function () {
        alert(1);
    });
}
