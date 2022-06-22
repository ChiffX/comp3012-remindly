const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const app = express();

const PORT = 8080;

app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.set("view engine", "ejs");


app.listen(PORT);