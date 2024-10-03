let theme = "light";

(function init() {
    window.MovieWidgets.initialize();

    document.getElementById("addDynamicWidget").addEventListener("click", function () {
        const newWidget = document.createElement("wl-movie-details");
        document.getElementById("dynamincWidgetArea").appendChild(newWidget);

        window.MovieWidgets.render();
    });

    document.getElementById("removeDynamicWidget").addEventListener("click", function () {
        document.getElementById("dynamincWidgetArea").querySelector("wl-movie-details").remove();

        window.MovieWidgets.render();
    });

    updateContextData("movie-context", theme);
    addEventListenerOnChangeThemeButton();
})();

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
