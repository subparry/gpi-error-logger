var express = require('express')
var bodyParser = require('body-parser')

var router = express.Router()
var pool = require('../db')
var jsonParser = bodyParser.json()

function routeLogger(req, res, next) {
  console.log('ROUTE LOGGER: url=' + req.url)
  console.log('ROUTE LOGGER: method=' + req.method)
  next()
}

router.use(routeLogger)

let recordCount = 'not-init'

router.get('/', function (req, res) {
  res.send('Root route. Visit /errors to get all current errors')
})

router.get('/errors', function (req, res) {
  pool
    .query('SELECT * FROM errors ORDER BY id DESC LIMIT 50')
    .then(function (data) {
      res.send({ errors: data.rows })
    })
})

router.get('/errors/count', function (req, res) {
  pool.query('SELECT COUNT(id) FROM errors;').then(function (data) {
    res.send({ count: data.rows })
  })
})

router.post('/errors', jsonParser, function (req, res) {
  ;(async function () {
    const client = await pool.connect()

    try {
      if (recordCount === 'not-init') {
        const data = await client.query('SELECT COUNT(id) FROM errors;')
        recordCount = parseInt(data.rows[0].count)
      }
    } catch (error) {
      console.log('COUNT ERROR:', error.message)
    }
    try {
      await client.query('BEGIN')
      const result = await client.query(
        'SELECT id, occurrence_count FROM errors WHERE type = $1 AND message = $2 AND url = $3',
        [req.body.type, req.body.message, req.body.url]
      )
      if (result.rows.length) {
        await client.query(
          'UPDATE errors SET occurrence_count = $1, last_occurrence_at = $2 WHERE id = $3',
          [result.rows[0].occurrence_count + 1, new Date(), result.rows[0].id]
        )
      } else {
        const query = {
          text:
            'INSERT INTO errors(type, message, first_occurrence_at, last_occurrence_at, url, browser, ip) VALUES($1, $2, $3, $4, $5, $6, $7)',
          values: [
            req.body.type || 'N/A',
            req.body.message || 'N/A',
            new Date(),
            new Date(),
            req.body.url || 'N/A',
            req.body.browser || 'N/A',
            req.ip,
          ],
        }
        await client.query(query)
      }
      await client.query('COMMIT')
      typeof recordCount !== 'string' && recordCount++
      res.status(201).send({ message: 'ok' })
    } catch (e) {
      await client.query('ROLLBACK')
      console.log('ERROR: ', e.message)
      res.status(500).send({ message: e.message })
    } finally {
      if (typeof recordCount !== 'string' && recordCount > 5000) {
        await client.query('DELETE FROM errors;')
        recordCount = 'not-init'
      }
      client.release()
    }
  })().catch((e) => console.error(e.stack))
})

module.exports = router
