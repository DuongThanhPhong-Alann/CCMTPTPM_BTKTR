const path = require("node:path");
const express = require("express");

const webRouter = require("./routes/web");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "..", "public")));

app.use("/", webRouter);

module.exports = app;

