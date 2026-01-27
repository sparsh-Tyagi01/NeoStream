const express = require('express')
const router = express.Router()
const {otpGenerateHandler, otpVerifyHandler, countUserHandler, userLogin} = require('../controllers/user')


router.post('/send-otp', otpGenerateHandler);
router.post('/verify-otp', otpVerifyHandler);
router.get('/count-user', countUserHandler);
router.post('/login', userLogin)

module.exports = router