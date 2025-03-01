const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const twilio = require("twilio");
const nodemailer = require("nodemailer");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) return res.status(400).json({ message: "Email or Phone already exists" });

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    const user = new User({ name, email, phone, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
    res.json({'msg': "Login Successfull", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate reset token (valid for 15 mins)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Click this link to reset your password: ${resetLink} \nThis link will expire in 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset link sent to email!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// **RESET PASSWORD** - Verify Token & Update Password
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS));
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful! You can now log in with your new password." });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  try {
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate OTP using Twilio
    const otpResponse = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: phone, channel: "sms" });

    res.json({ message: "OTP sent successfully", sid: otpResponse.sid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// **VERIFY OTP**
router.post("/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;
  try {
    if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP are required" });

    const verificationCheck = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phone, code: otp });

    if (verificationCheck.status !== "approved") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user = await User.findOne({ phone });

    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });

    res.json({ message: "OTP verified successfully", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
