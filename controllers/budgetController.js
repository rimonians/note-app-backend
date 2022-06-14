// Budget controller
const budgetController = {};

// Import user model
const User = require("../models/userModel");

// Import budget model
const Budget = require("../models/budgetModel");

// Create budgets
budgetController.createBudget = async (req, res, next) => {
  try {
    const data = req.body;
    const finalData = { ...data, user: req.payload._id };
    const newBudget = new Budget(finalData);
    const budget = await newBudget.save();

    await User.updateOne(
      { _id: req.payload._id },
      { $push: { budgets: budget._id } }
    );
    res.status(201).json({ message: "Budget successfully created" });
  } catch (err) {
    next(err);
  }
};

// Get budgets
budgetController.getBudgets = async (req, res, next) => {
  try {
    const results = await Budget.find({ user: req.payload._id }).populate(
      "user",
      "_id username email"
    );
    res.status(200).json({ results });
  } catch (err) {
    next(err);
  }
};

// Get budget
budgetController.getBudget = async (req, res, next) => {
  try {
    const result = await Budget.findOne({
      _id: req.params.id,
      user: req.payload._id,
    }).populate("user", "_id username email");
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

// Update budget
budgetController.updateBudget = async (req, res, next) => {
  try {
    const data = req.body;
    await Budget.updateOne(
      { _id: req.params.id, user: req.payload._id },
      { $set: data }
    );
    res.status(201).json({ message: "Budget successfully updated" });
  } catch (err) {
    next(err);
  }
};

// Delete budget
budgetController.deleteBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.payload._id,
    });

    if (budget) {
      await User.updateOne(
        { _id: req.payload._id },
        { $pull: { budgets: budget._id } }
      );
      res.status(201).json({ message: "Budget successfully deleted" });
    } else {
      res.status(404).json({ message: "No budget found for delete" });
    }
  } catch (err) {
    next(err);
  }
};

// Export budget controller
module.exports = budgetController;
