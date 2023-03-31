const { Pool } = require("pg");
const { db } = require('./config')

const pool = new Pool({
  user: db.dbuser,
  password: db.dbpassword,
  host: db.host,
  port: db.port,
  database: db.database,
});

module.exports = pool;