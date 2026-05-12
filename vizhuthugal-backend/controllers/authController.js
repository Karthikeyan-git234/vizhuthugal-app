const pool = require('../config/db');

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const result = await pool.query(
      `INSERT INTO users(email,password)
       VALUES($1,$2)
       RETURNING *`,
      [email, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Server Error',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }

    res.json({
      message: 'Login success',
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Server Error',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};