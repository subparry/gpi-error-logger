var express = require("express");
var cors = require("cors");
var app = express();
var router = require("./routes/index.js");

app.use(cors());
app.use(router);

app.listen(3030, function () {
  console.log("Server started in port 3030");
});
