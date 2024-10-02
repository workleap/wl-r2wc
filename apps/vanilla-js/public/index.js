let theme = "dark";

(function init() {
    window.MovieWidgets.initialize();

    updateContextData("context1", theme);
    updateMovieDetailsData("widget1");
    handleChangeTheme();
})();


function handleChangeTheme() {
    const button = document.getElementById("changeTheme");
    button.addEventListener("click", function () {
        theme = theme === "light" ? "dark" : "light";
        updateContextData("context1", theme);
    });
}


function updateMovieDetailsData(id) {
    const widget = document.getElementById(id);

    widget.data = {
        showRanking: true,
        onClose: () => {
            console.log("Widget closed!");
        }
    };
}

function updateContextData(id, currentTheme) {
    const widget = document.getElementById(id);

    widget.data = {
        theme: currentTheme
    };
}