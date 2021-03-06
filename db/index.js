var pg = require('pg')
var Pool = pg.Pool

var connectionConf =
  process.env.NODE_ENV === 'development'
    ? {
        user: 'gpilogger',
        host: 'localhost',
        database: 'gpiloggerdb',
        password: 'GPILogger',
        port: 5432,
      }
    : {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }

var pool = new Pool(connectionConf)

module.exports = {
  query: function (sql) {
    return pool.query(sql)
  },
  connect: function (cb) {
    return pool.connect(cb)
  },
}
