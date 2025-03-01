const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require("../middlewares/upload"); // Middleware for image upload
const authMiddleware = require("../middlewares/authMiddleware");

// ✅ GET User Profile - After Successful Login
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password -email -name -connections -phone -_id -createdAt -updatedAt");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ UPDATE User Profile - If Fields are Missing
router.post("/profile/update", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { profession, interest, location } = req.body;
    let updateFields = { profession, interest, location };

    // ✅ Check if an image is uploaded
    if (req.file && req.file.path) {
      updateFields.image = req.file.path;
    }

    // ✅ Update user data
    const updatedUser = await User.findByIdAndUpdate(req.body.userId, updateFields, { new: true, runValidators: true }).select("-password");

    res.json({'msg': "Profile updated successfully."});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/search", authMiddleware, async (req, res) => {
  try {
    const { name, profession, location } = req.query;
    const userId = req.body.userId; 

    // Create a filter object
    let filter = { _id: { $ne: userId } }; 

    if (name) {
      filter.name = { $regex: name, $options: "i" }; // Case-insensitive name search
    }

    if (profession) {
      filter.profession = { $regex: profession, $options: "i" }; // Case-insensitive profession search
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" }; // Case-insensitive location search
    }

    // Fetch users excluding sensitive info
    const users = await User.find(filter).select("-password -email -phone");

    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


module.exports = router;
