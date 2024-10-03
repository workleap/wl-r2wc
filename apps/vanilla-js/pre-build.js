import shell from "shelljs";

const CssFilePath = "../../widgets/dist/index.css";
const JsFilePath = "../../widgets/dist/index.js";

const cssExist = shell.test("-f", CssFilePath);
const jsExist = shell.test("-f", JsFilePath);

if (!cssExist) {
    throw new Error("Widget CSS file doesn't exist. Build the widget project first.");
}

if (!jsExist) {
    throw new Error("Widget JS file doesn't exist. Build the widget project first.");
}

shell.cp("-f", CssFilePath, "public/widget.css");
shell.cp("-f", JsFilePath, "public/widget.js");
