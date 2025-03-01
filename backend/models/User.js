const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profession: { type: String },  // Profession field added
  interest: { type: [String], default: [] }, // Array of interests
  image: { type: String }, // URL or base64 encoded string
  location: {type: String},
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // References to other users
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model("User", UserSchema);
