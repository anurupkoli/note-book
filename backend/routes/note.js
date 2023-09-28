const Note = require("../models/Note");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

// Creating new Notes instsance by "/api/notes/addNote" request
router.post(
  "/addNote",
  [
    body("title", "Enter atleast 3 characters").isLength({ min: 3 }),
    body("description", "Enter atleast 5 characters").isLength({ minl: 5 }),
    body("tag", "Enter atleast 3 characters").isLength({ min: 3 }),
  ],
  fetchUser,
  async (req, res) => {
    // Validating notes w.r.t to specified validations
    let success = false;
    const error = validationResult(req);
    // If errors found, returning with status code 400 and error message
    if (!error.isEmpty()) {
      success = false;
      return res.status(400).json({success, error: error.array() });
    }
    // If validated, pushing data to database
    try {
      let success = true
      const { title, description, tag } = req.body;
      const note = await Note.create({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id,
      });
      res.status(200).json({success, note });
    } catch (error) {
      success = false;
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// Fetching Notes with GET request "/api/note/getNotes": Login is required
router.get("/getNotes", fetchUser, async (req, res) => {
  // checking if user has created any note
  let success = false;
  try {
    let note = await Note.findOne({ user: req.user.id });
    if (!note) {
      success = false;
      return res.json({success,note, error: "No note found" });
    }
    // Fetching user notes if user was validated
    success = true;
    note = await Note.find({ user: req.user.id });
    return res.json({success,note});
  } catch (error) {
    success = false;
    console.log(error);
    return res.status(500).json({success,error});
  }
});

// Updating note with PUT request "/api/note/updateNote/:id": Requires login
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  let success = false;''
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      success = false;
      return res.status(404).send("No note found");
    }
    if (note.user.toString() !== req.user.id) {
      success = false
      return res.status(404).json({success, message: "Authentication revoked"});
    }

    let { title, description, tag } = req.body;
    let updateNote = {};
    if (title) {
      updateNote.title = title;
    }
    if (description) {
      updateNote.description = description;
    }
    if (tag) {
      updateNote.tag = tag;
    }
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: updateNote },
      { new: true }
    );
    success = true;
    res.status(200).json({success, updatedNote});
  } catch (error) {
    success = false;
    console.log(error);
    res.status(500).json(success,error);
  }
});

// Deleting note with DELETE request by "/api/note/deleteNote/:id": Login required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      success = false;
      return res.status(404).json({success, message:"No note found"});
    }
    if (note.user.toString() !== req.user.id) {
      success = false;
      return res.status(500).json({success, message: "Authentication Revoked"});
    }
    success = true
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ success, deletedNote });
  } catch (error) {
    success = false
    console.log(error);
    res.status(500).json({success, error});
  }
});

module.exports = router;
