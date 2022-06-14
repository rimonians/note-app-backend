// Import external module
const express = require("express");

// Import check auth middleware
const checkAuth = require("../middlewares/checkAuth");

// Import from update profile validator middleware
const {
  updateProfileValidation,
  handleUpdateProfileValidation,
} = require("../middlewares/user/updateProfileValidator");

// Import from profile image upload middleware
const profileImageUpload = require("../middlewares/user/profileImageUpload");

// Import from user controller
const {
  getProfile,
  updateProfile,
  updateProfileImage,
} = require("../controllers/userController");

// Initialize Router
const router = express.Router();

// Use check auth middleware
router.use(checkAuth);

// Get user profile
router.get("/profile", getProfile);

// Update user profile
router.put(
  "/update-profile-info",
  updateProfileValidation,
  handleUpdateProfileValidation,
  updateProfile
);

// Update user profile image
router.put("/update-profile-image", profileImageUpload, updateProfileImage);

// Export router
module.exports = router;
