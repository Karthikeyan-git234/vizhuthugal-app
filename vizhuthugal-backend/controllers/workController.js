const pool = require('../config/db')

const createWorkReport = async (
  req,
  res
) => {
  try {
    const {
      employeeName,
      checkIn,
      checkOut,
      workDone,
    } = req.body

    const result =
      await pool.query(
        `INSERT INTO work_reports
        (employee_name, check_in, check_out, work_done)
        
        VALUES($1, $2, $3, $4)
        
        RETURNING *`,
        [
          employeeName,
          checkIn,
          checkOut,
          workDone,
        ]
      )

    res.status(201).json({
      message:
        'Work report saved',
      data: result.rows[0],
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Server Error',
    })
  }
}

module.exports = {
  createWorkReport,
}