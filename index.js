var express = require("express");
var cors = require("cors");
var app = express();
var router = require("./routes/index.js");

var PORT = process.env.PORT || 3030;

app.use(
  cors({
    origin: ["http://aeq.me", "https://www.goplaceit.com"],
    methods: ["POST", "GET"],
  })
);
app.use(router);

app.listen(PORT, function () {
  console.log("Server started in port " + PORT);
});
