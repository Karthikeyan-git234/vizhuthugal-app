const pool = require('../config/db');

const getEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM employees ORDER BY id ASC'
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Server Error',
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, email, department } = req.body;

    const result = await pool.query(
      `INSERT INTO employees(name, email, department)
       VALUES($1, $2, $3)
       RETURNING *`,
      [name, email, department]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Server Error',
    });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
};