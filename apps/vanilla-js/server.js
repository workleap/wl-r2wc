
// server.js
const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/cdn", express.static(path.join(__dirname, "../../widgets/dist")));//it is a sample of CDN

// Define a route to serve the HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});