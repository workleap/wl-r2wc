
// server.js
import compression from "compression";
import express from "express";
import { join } from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = import.meta.dirname;

app.use(compression());

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, "public")));
app.use("/cdn/movie-widgets", express.static(join(__dirname, "../widgets/movie-widgets/dist/cdn")));//it is a sample of CDN

// Define a route to serve the HTML file
app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
