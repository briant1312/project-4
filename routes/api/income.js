const express = require('express')
const router = express.Router()

const incomeCtrl = require('../../controllers/api/income')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.post('/', ensureLoggedIn, incomeCtrl.create)
router.get('/', ensureLoggedIn, incomeCtrl.show)
router.delete('/:incomeId', ensureLoggedIn, incomeCtrl.deleteIncome)
router.patch('/:incomeId', ensureLoggedIn, incomeCtrl.update)


module.exports = router