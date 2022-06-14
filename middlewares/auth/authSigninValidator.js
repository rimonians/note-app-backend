// Import external module
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// Import user model
const User = require("../../models/userModel");

// Auth signin validation middleware
const authSigninValidation = [
  check("email", "Email required")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email address is not valid")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject("No account found with this email");
        }
      } catch (err) {
        return Promise.reject(err.message);
      }
    }),
  check("password", "Password required")
    .not()
    .isEmpty()
    .isStrongPassword()
    .withMessage("Password is not strong"),
];

// Handle auth signin validation middleware
const handleAuthSigninValidation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.entries(mappedErrors).length === 0) {
      next();
    } else {
      res.status(400).json({ errors: mappedErrors });
    }
  } catch (err) {
    next(err);
  }
};

// Export auth signin validation & handle auth signin validation middlewares
module.exports = { authSigninValidation, handleAuthSigninValidation };
