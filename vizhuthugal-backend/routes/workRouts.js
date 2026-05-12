const express = require('express')

const router = express.Router()

const {
  createWorkReport,
} = require('../controllers/workController')

router.post('/', createWorkReport)

module.exports = router

