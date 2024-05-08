const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/', require('./auth'))
router.use('/users', require('./user'))
router.use('/sessions', require('./session'))
router.use('/roles', require('./role'))
router.use('/reports', require('./report'))
router.use('/promocodes', require('./promocode'))
router.use('/products', require('./product'))
router.use('/comments', require('./comment'))
router.use('/buskets', require('./busket'))

module.exports = router