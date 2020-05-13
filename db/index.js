var pgp = require("pg-promise")();

var connectionConf =
  process.env.NODE_ENV === "development"
    ? {
        host: "localhost",
        port: 5432,
        database: "gpiloggerdb",
        user: "gpilogger",
        password: "GPILogger",
        max: 30,
      }
    : process.env.DATABASE_URL;

var db = pgp(connectionConf);

module.exports = db;
