let theme = "dark";

(function init() {
    window.MovieWidgets.initialize();

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