// Import internal module
const fs = require("fs");
const path = require("path");

// User controller
const userController = {};

// Import user model
const User = require("../models/userModel");

// Get user profile
userController.getProfile = async (req, res, next) => {
  try {
    const result = await User.findOne(
      { _id: req.payload._id },
      "-budgets"
    ).populate("budgets", "_id title type amount createdAt updatedAt");
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

// Update user profile
userController.updateProfile = async (req, res, next) => {
  try {
    const { bio, dateOfBirth, gender, address, mobile } = req.body;

    await User.updateOne(
      { _id: req.payload._id },
      { $set: { bio, dateOfBirth, gender, address, mobile } }
    );
    res.status(201).json({ message: "User profile successfully updated" });
  } catch (err) {
    next(err);
  }
};

// Update user profile image
userController.updateProfileImage = async (req, res, next) => {
  try {
    const file = req.files[0];
    if (file) {
      const user = await User.findOneAndUpdate(
        { _id: req.payload._id },
        { $set: { profileImage: file.filename } }
      );
      // Unlink previous image if exists
      const prevImage = user.profileImage;
      if (prevImage) {
        const prevImagePath = path.join(
          __dirname + `/../public/uploads/users/${prevImage}`
        );
        fs.unlink(prevImagePath, (err) => {
          if (err) console.log("Something went wrong");
        });
      }

      res
        .status(201)
        .json({ message: "User profile image successfully updated" });
    } else {
      res.status(500).json({ message: "Please select an image first" });
    }
  } catch (err) {
    next(err);
  }
};

// Export budget controller
module.exports = userController;
