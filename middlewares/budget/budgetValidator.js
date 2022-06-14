// Import external module
const { check, validationResult } = require("express-validator");

// Import budget model
const Budget = require("../../models/budgetModel");

// Budget validation middleware
const budgetValidation = [
  check("title", "Budget title required").not().isEmpty(),
  check("type", "Budget type required")
    .not()
    .isEmpty()
    .isIn(["income", "expense"])
    .withMessage("No a valid budget type"),
  check("amount", "Budget amount required")
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("Not a valid budget amount"),
];

// Handle budget validation middleware
const handleBudgetValidation = async (req, res, next) => {
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
module.exports = { budgetValidation, handleBudgetValidation };
