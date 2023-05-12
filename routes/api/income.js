const express = require('express')
const router = express.Router()
const cors = require('cors')

const opts = { origin: process.env.CLIENT_ORIGIN || `http://localhost:3000` }

const incomeCtrl = require('../../controllers/api/income')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.post('/', cors(opts), ensureLoggedIn, incomeCtrl.create)
router.get('/', cors(opts), ensureLoggedIn, incomeCtrl.show)
router.delete('/:incomeId', cors(opts), ensureLoggedIn, incomeCtrl.deleteIncome)
router.patch('/:incomeId', cors(opts), ensureLoggedIn, incomeCtrl.update)


module.exports = router