const express = require('express')
const router = express.Router()
const {otpGenerateHandler, otpVerifyHandler, countUserHandler} = require('../controllers/user')


router.post('/send-otp', otpGenerateHandler);
router.post('/verify-otp', otpVerifyHandler);
router.get('/count-user', countUserHandler);

module.exports = router