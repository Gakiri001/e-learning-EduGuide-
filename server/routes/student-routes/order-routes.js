const express = require('express')
const {createOrder, capturePaymentAndFinanlizeOrder} = require('../../controllers/student-controllers/order-controllers')

const router = express.Router()

router.post('/create', createOrder)

router.post('/capture', capturePaymentAndFinanlizeOrder)

module.exports = router