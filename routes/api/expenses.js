const express = require('express')
const router = express.Router()

const expensesCtrl = require('../../controllers/api/expenses')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.post('/', ensureLoggedIn, expensesCtrl.create)
router.get('/', ensureLoggedIn, expensesCtrl.show)
router.delete('/:expenseId', ensureLoggedIn, expensesCtrl.deleteExpense)
router.patch('/:expenseId', ensureLoggedIn, expensesCtrl.update)


module.exports = router