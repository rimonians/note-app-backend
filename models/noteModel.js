// Import external module
const mongoose = require("mongoose");

// Import user model
const User = require("../models/userModel");

// Note schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Note model
const Note = mongoose.model("Note", noteSchema);

// Export note model
module.exports = Note;
