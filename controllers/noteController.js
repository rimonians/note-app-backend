// Note controller
const noteController = {};

// Import user model
const User = require("../models/userModel");

// Import note model
const Note = require("../models/noteModel");

// Create notes
noteController.createNote = async (req, res, next) => {
  try {
    const data = req.body;
    const finalData = { ...data, user: req.payload._id };
    const newNote = new Note(finalData);
    const note = await newNote.save();
    const result = await note.populate("user", "_id username email");

    await User.updateOne(
      { _id: req.payload._id },
      { $push: { notes: note._id } }
    );

    res.status(201).json({
      message: "Note successfully created",
      result,
    });
  } catch (err) {
    next(err);
  }
};

// Get notes
noteController.getNotes = async (req, res, next) => {
  try {
    const results = await Note.find({ user: req.payload._id }).populate(
      "user",
      "_id username email"
    );
    res.status(200).json({ results });
  } catch (err) {
    next(err);
  }
};

// Get note
noteController.getNote = async (req, res, next) => {
  try {
    const result = await Note.findOne({
      _id: req.params.id,
      user: req.payload._id,
    }).populate("user", "_id username email");
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

// Update note
noteController.updateNote = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.payload._id },
      { $set: data },
      { new: true }
    ).populate("user", "_id username email");
    res.status(201).json({ message: "Note successfully updated", result });
  } catch (err) {
    next(err);
  }
};

// Delete note
noteController.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.payload._id,
    }).populate("user", "_id username email");

    if (note) {
      await User.updateOne(
        { _id: req.payload._id },
        { $pull: { notes: note._id } }
      );
      res
        .status(201)
        .json({ message: "Note successfully deleted", result: note });
    } else {
      res.status(404).json({ message: "No note found for delete" });
    }
  } catch (err) {
    next(err);
  }
};

// Export note controller
module.exports = noteController;
