var express = require("express");
var bodyParser = require("body-parser");

var router = express.Router();
var db = require("../db/index.js");
var jsonParser = bodyParser.json();

function routeLogger(req, res, next) {
  console.log("ROUTE LOGGER: url=" + req.url);
  console.log("ROUTE LOGGER: method=" + req.method);
  next();
}

router.use(routeLogger);

router.get("/", function (req, res) {
  console.log("hello!");
  res.end();
});

router.get("/errors", function (req, res) {
  db.any("SELECT * FROM errors LIMIT 10").then(function (data) {
    res.send({ errors: data });
  });
});

router.post("/errors", jsonParser, function (req, res) {
  db.none(
    "INSERT INTO errors(type, message, created_at, url) VALUES ($1, $2, $3, $4)",
    [req.body.type, req.body.message, new Date(), req.body.url]
  );
  res.status(201).send({ message: "ok" });
});

module.exports = router;
