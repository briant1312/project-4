const express = require('express')
const router = express.Router()
const cors = require('cors')

const opts = { origin: process.env.CLIENT_ORIGIN || `http://localhost:3000` }

const expensesCtrl = require('../../controllers/api/expenses')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.post('/', cors(opts), ensureLoggedIn, expensesCtrl.create)
router.get('/', cors(opts), ensureLoggedIn, expensesCtrl.show)
router.delete('/:expenseId', cors(opts), ensureLoggedIn, expensesCtrl.deleteExpense)
router.patch('/:expenseId', cors(opts), ensureLoggedIn, expensesCtrl.update)


module.exports = router