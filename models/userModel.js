// Import external module
const mongoose = require("mongoose");

// Import budget model
const Budget = require("../models/budgetModel");

// User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    dateOfBirth: {
      type: String,
      default: "",
      trim: true,
    },
    gender: {
      type: String,
      default: "",
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    mobile: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    budgets: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Budget",
      },
    ],
  },
  { timestamps: true }
);

// User model
const User = mongoose.model("User", userSchema);

// Export user model
module.exports = User;
