// Import external module
const express = require("express");

// Import from auth signup validator middleware
const {
  authSignupValidation,
  handleAuthSignupValidation,
} = require("../middlewares/auth/authSignupValidator");

// Import from auth signin validator middleware
const {
  authSigninValidation,
  handleAuthSigninValidation,
} = require("../middlewares/auth/authSigninValidator");

// Import from user controller
const { signup, signin } = require("../controllers/authController");

// Initialize Router
const router = express.Router();

// Signup user
router.post(
  "/signup",
  authSignupValidation,
  handleAuthSignupValidation,
  signup
);

// Signin user
router.post(
  "/signin",
  authSigninValidation,
  handleAuthSigninValidation,
  signin
);

// Export user route
module.exports = router;
