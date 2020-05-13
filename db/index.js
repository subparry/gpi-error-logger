var pgp = require("pg-promise")();

var connectionConf = {
  host: "localhost",
  port: 5432,
  database: "gpiloggerdb",
  user: "gpilogger",
  password: "GPILogger",
  max: 30,
};

var db = pgp(connectionConf);

module.exports = db;
