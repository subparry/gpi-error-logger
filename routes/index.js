var express = require("express");
var bodyParser = require("body-parser");

var router = express.Router();
var db = require("../db");
var jsonParser = bodyParser.json();

function routeLogger(req, res, next) {
  console.log("ROUTE LOGGER: url=" + req.url);
  console.log("ROUTE LOGGER: method=" + req.method);
  next();
}

router.use(routeLogger);

router.get("/", function (req, res) {
  res.send("Root route. Visit /errors to get all current errors");
});

router.get("/errors", function (req, res) {
  db.query("SELECT * FROM errors LIMIT 50").then(function (data) {
    res.send({ errors: data.rows });
  });
});

router.post("/errors", jsonParser, function (req, res) {
  const query = {
    text:
      "INSERT INTO errors(type, message, created_at, url) VALUES($1, $2, $3, $4)",
    values: [
      req.body.type || "N/A",
      req.body.message || "N/A",
      new Date(),
      req.body.url || "N/A",
    ],
  };
  db.query(query)
    .then(function () {
      res.status(201).send({ message: "ok" });
    })
    .catch(function (err) {
      res
        .status(500)
        .send("Error: " + err.message + ". values: " + query.values);
    });
});

module.exports = router;
