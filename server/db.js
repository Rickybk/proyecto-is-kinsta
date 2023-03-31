const { Pool } = require("pg");
const { db } = require('./config')

const pool = new Pool({
  user: 'dbuser',
  password: 'dbpassword',
  host: 'dbstore-gf2ir-postgresql.dbstore-gf2ir.svc.cluster.local',
  port: 5432,
  database: 'dbstore'
});

module.exports = pool;