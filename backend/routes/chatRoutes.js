const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const authMiddleware = require("../middlewares/authMiddleware");

// 📩 Send a message
router.post("/send", authMiddleware, async (req, res) => {
  const { receiverId, message } = req.body;
  try {
    const newMessage = new Message({
      sender: req.body.userId,
      receiver: receiverId,
      message,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📜 Get chat messages between two users
router.get("/:receiverId", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.body.userId, receiver: req.params.receiverId },
        { sender: req.params.receiverId, receiver: req.body.userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
