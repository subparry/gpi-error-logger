var express = require("express");
var cors = require("cors");
var app = express();
var router = require("./routes/index.js");

var PORT = process.env.NODE_ENV === "development" ? 3030 : 16833;

app.use(cors());
app.use(router);

app.listen(PORT, function () {
  console.log("Server started in port " + PORT);
  console.log("database url = ", process.env.DATABASE_URL);
});
