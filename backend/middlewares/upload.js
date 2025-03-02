const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_profiles", // Cloudinary folder name
    allowed_formats: ["jpg", "png", "svg"], // Allowed file types
    transformation: [{ width: 500, height: 500, crop: "limit" }] // Resize image
  },
});

const upload = multer({ storage });

module.exports = upload;
