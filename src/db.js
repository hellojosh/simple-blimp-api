const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'simpleblimp',
  // password: 'password',
  port: 5432,
});

exports.pool = pool;

exports.query = async (sql, values) => {
  const { rows } = await pool.query(sql, values);

  return rows;
};
