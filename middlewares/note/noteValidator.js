// Import external module
const { check, validationResult } = require("express-validator");

// Import note model
const Note = require("../../models/noteModel");

// Note validation middleware
const noteValidation = [
  check("title", "Note title required").not().isEmpty(),
  check("description", "Note description required").not().isEmpty(),
];

// Handle note validation middleware
const handleNoteValidation = async (req, res, next) => {
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

// Export note validation & handle note validation middlewares
module.exports = { noteValidation, handleNoteValidation };
