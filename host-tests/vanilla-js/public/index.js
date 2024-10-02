let theme = "dark";

(function init() {
    window.MovieWidgets.initialize();

    updateContextData("context1", theme);
    handleChangeTheme();
})();


function handleChangeTheme() {
    const button = document.getElementById("changeTheme");
    button.addEventListener("click", function () {
        theme = theme === "light" ? "dark" : "light";
        updateContextData("context1", theme);
    });
}


function updateContextData(id, currentTheme) {
    const widget = document.getElementById(id);
    widget.attributes.theme.value = currentTheme;
}