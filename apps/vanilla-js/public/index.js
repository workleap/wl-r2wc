let theme = "dark";

(function init() {
    window.MovieWidgets.initialize({ theme });
    addEventListenerOnChangeThemeButton();
})();

function addEventListenerOnChangeThemeButton() {
    const button = document.getElementById("changeTheme");

    button.addEventListener("click", function () {
        theme = theme === "light" ? "dark" : "light";
        window.MovieWidgets.update({ theme });
    });
}
