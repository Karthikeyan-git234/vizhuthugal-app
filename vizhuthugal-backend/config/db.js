const { Pool } = require('pg');
require('dotenv').config();
console.log(process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log('PostgreSQL Connected'))
  .catch(err => console.log(err));

module.exports = pool;