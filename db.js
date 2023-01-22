const { Pool } = require('pg')

const pool = new Pool({
  database: 'noNoise',
  user:     'marcy',
  password: 'marcy',
  host: 'localhost',
  port: 5432

})

module.exports = {pool}