const dotenv = require('dotenv')
const User = require('../models/user')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

dotenv.config()

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function otpGenerateHandler(req, res) {
    const { email } = req.body;
  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 300 * 1000);

  let user = await User.findOne({ email });
  if (!user) user = new User({ email });

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}, it will expire in 5 minutes`,
  });

  res.json({ message: 'OTP sent' });
}

async function otpVerifyHandler(req, res) {
    const {otp, email}= req.body
    const user = await User.findOne({email})

    if(!user || user.otp!=otp || user.otpExpires< new Date()){
        return res.status(400).json({ message: 'Invalid or expired OTP' })
    }

  
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ 
    "token": token,
    "email": email
   });
}

async function countUserHandler(req,res) {
  const user = await User.countDocuments({})
  return res.status(200).json(user)
}

module.exports = {otpGenerateHandler, otpVerifyHandler, countUserHandler}
