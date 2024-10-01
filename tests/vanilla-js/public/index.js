let theme = "dark";

(function init() {

  window.MoviePlugin.initialize();

  updateMovieDetailsData("widget1");
  updateMovieDPopUpData("trigger1");
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


function updateMovieDetailsData(id) {
  const widget = document.getElementById(id);

  widget.data = {
    showRanking: true,
    onClose: () => {
      console.log("Widget closed!");
    },
  };
}

function updateMovieDPopUpData(id) {
  const widget = document.getElementById(id);

  widget.data = {
    text: "Click Me!",
  };
}

function updateContextData(id, theme) {
  const widget = document.getElementById(id);

  widget.data = {
    theme: theme,
  };
}