// Import external module
const express = require("express");

// Import check auth middleware
const checkAuth = require("../middlewares/checkAuth");

// Import from note validator middleware
const {
  noteValidation,
  handleNoteValidation,
} = require("../middlewares/note/noteValidator");

// Import from note controller
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

// Initialize Router
const router = express.Router();

// Use check auth middleware
router.use(checkAuth);

// Create note
router.post("/create", noteValidation, handleNoteValidation, createNote);

// Get notes
router.get("/notes", getNotes);

// Get note
router.get("/:id", getNote);

// Update note
router.put("/:id", noteValidation, handleNoteValidation, updateNote);

// Delete note
router.delete("/:id", deleteNote);

// Export router
module.exports = router;
