// Import external module
const mongoose = require("mongoose");

// Import user model
const User = require("../models/userModel");

// Budget schema
const budgetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Budget model
const Budget = mongoose.model("Budget", budgetSchema);

// Export budget model
module.exports = Budget;
