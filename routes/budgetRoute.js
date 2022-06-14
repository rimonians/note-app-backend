// Import external module
const express = require("express");

// Import check auth middleware
const checkAuth = require("../middlewares/checkAuth");

// Import from budget validator middleware
const {
  budgetValidation,
  handleBudgetValidation,
} = require("../middlewares/budget/budgetValidator");

// Import from budget controller
const {
  createBudget,
  getBudgets,
  getBudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/budgetController");

// Initialize Router
const router = express.Router();

// Use check auth middleware
router.use(checkAuth);

// Create budget
router.post("/create", budgetValidation, handleBudgetValidation, createBudget);

// Get budgets
router.get("/budgets", getBudgets);

// Get budget
router.get("/:id", getBudget);

// Update budget
router.put("/:id", budgetValidation, handleBudgetValidation, updateBudget);

// Delete budget
router.delete("/:id", deleteBudget);

// Export router
module.exports = router;
