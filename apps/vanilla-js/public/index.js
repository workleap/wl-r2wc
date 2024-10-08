
(function init() {
    window.MovieWidgets.initialize({ theme: "light" });

    initDynamicParts();
    handleMovieDetailsClick();

    addEventListenerOnChangeThemeButton();
})();

function initDynamicParts() {
    document.getElementById("addDynamicWidget").addEventListener("click", function () {
        addDynamicWidget();
    });

    document.getElementById("removeDynamicWidget").addEventListener("click", function () {
        document.getElementById("dynamincWidgetArea").querySelector("wl-movie-pop-up").remove();
    });
}

function addDynamicWidget() {
    const newWidget = document.createElement("wl-movie-pop-up");
    newWidget.setAttribute("text", "Click!");
    document.getElementById("dynamincWidgetArea").appendChild(newWidget);
}

function addEventListenerOnChangeThemeButton() {
    const button = document.getElementById("changeTheme");

    button.addEventListener("click", function () {
        const oldTheme = window.MovieWidgets?.appSettings?.theme;
        window.MovieWidgets?.update({ theme: oldTheme === "dark" ? "light" : "dark" });
    });
}


function handleMovieDetailsClick() {
    document.getElementById("movide-details").addEventListener("on-add-item", function () {
        addDynamicWidget();
    });
}
