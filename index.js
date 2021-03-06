var express = require("express");
var cors = require("cors");
var app = express();
var router = require("./routes/index.js");

var PORT = process.env.PORT || 3030;

var allowedCORSOrigins =
  process.env.NODE_ENV === "development"
    ? ["http://localhost:3000"]
    : ["http://aeq.me", "https://www.goplaceit.com"];

app.use(
  cors({
    origin: allowedCORSOrigins,
    methods: ["POST", "GET", "OPTIONS"],
  })
);
app.use(router);

app.listen(PORT, function () {
  console.log("Server started in port " + PORT);
});
