let theme = "light";

(function init() {
    window.MovieWidgets.initialize();

    document.getElementById("addDynamicWidget").addEventListener("click", function () {
        // const newWidget = document.createElement("wl-movie-details");
        // document.getElementById("dynamincWidgetArea").appendChild(newWidget);
        const newWidget2 = document.createElement("wl-movie-pop-up");
        document.getElementById("dynamincWidgetArea").appendChild(newWidget2);
    });

    document.getElementById("removeDynamicWidget").addEventListener("click", function () {
        //  document.getElementById("dynamincWidgetArea").querySelector("wl-movie-details:last-of-type").remove();
        document.getElementById("dynamincWidgetArea").querySelector("wl-movie-pop-up").remove();
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
