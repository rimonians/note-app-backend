// Import external module
const { check, validationResult } = require("express-validator");

// Import user model
const User = require("../../models/userModel");

// Update profile validation middleware
const updateProfileValidation = [
  check("bio", "Bio required")
    .not()
    .isEmpty()
    .isLength({ max: 50 })
    .withMessage("Bio can't be longer than 50 character"),
  check("dateOfBirth", "Date of Birth required")
    .not()
    .isEmpty()
    .isDate("YYYY/MM/DD")
    .withMessage("Not a valid date"),
  check("gender", "Gender required")
    .not()
    .isEmpty()
    .isIn(["male", "female"])
    .withMessage("Not a valid gender type"),
  check("address", "Address required")
    .not()
    .isEmpty()
    .isLength({ max: 50 })
    .withMessage("Address can't be longer than 50 character"),
  check("mobile", "Mobile number required")
    .not()
    .isEmpty()
    .isMobilePhone("bn-BD")
    .withMessage("Not a valid mobile number"),
];

// Handle update profile validation middleware
const handleUpdateProfileValidation = async (req, res, next) => {
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

// Export budget validation & handle budget validation middlewares
module.exports = { updateProfileValidation, handleUpdateProfileValidation };
