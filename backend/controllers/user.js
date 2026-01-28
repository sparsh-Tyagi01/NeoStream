const dotenv = require('dotenv')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const transporter = require('../utils/mailer');
const bcrypt = require("bcrypt")

dotenv.config()

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

async function otpGenerateHandler(req, res) {
  try {
    const { username, email } = req.body;
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 300 * 1000);

    const existingUsername = await User.findOne({ username })
    if(existingUsername) {
      return res.status(404).json({"message": "username already registered"})
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(404).json({"message": "email already registered"})
    }
    
    await User.create({
      username,
      email,
      otp,
      otpExpires
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}, it will expire in 5 minutes`,
    });

    res.json({ message: 'OTP sent' });
  } catch (error) {
    console.error('OTP Generate Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

async function otpVerifyHandler(req, res) {
  try {
    const {otp, email, password}= req.body
    const user = await User.findOne({email})

    if(!user || user.otp!=otp || user.otpExpires < new Date()){
      await User.deleteOne({email})
      return res.status(400).json({ message: 'Invalid or expired OTP' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

  const payload = {
    username: user.username,
    email: email,
    role: email === process.env.ADMIN_EMAIL ? "admin" : "user",
  }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({"token": token, ...payload});
  } catch (error) {
    console.error('OTP Verify Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

async function countUserHandler(req,res) {
  const user = await User.countDocuments({})
  return res.status(200).json(user)
}

async function userLogin(req,res) {
  const {email, password} = req.body;

  const user = await User.findOne({email})

  if(!user){
    return res.status(400).json({"message": "invalid email"})
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
    return res.status(400).json({"message": "incorrect password"})
  }

  const payload = {
    username: user.username,
    email: email,
    role: email === process.env.ADMIN_EMAIL ? "admin" : "user",
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.status(201).json({"token": token, ...payload});
}

module.exports = {otpGenerateHandler, otpVerifyHandler, countUserHandler, userLogin}
