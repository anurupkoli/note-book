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
    const error = validationResult(req);
    // If errors found, returning with status code 400 and error message
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    // If validated, pushing data to database
    try {
      const { title, description, tag } = req.body;
      const note = await Note.create({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id,
      });
      res.status(200).json({ note });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// Fetching Notes with GET request "/api/note/getNotes": Login is required
router.get("/getNotes", fetchUser, async (req, res) => {
  // checking if user has created any note
  try {
    let userId = await Note.findOne({ user: req.user.id });
    if (!userId) {
      return res.status(400).json({ error: "No note found" });
    }
    // Fetching user notes if user was validated
    let note = await Note.find({ user: req.user.id });
    return res.json(note);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// Updating note with PUT request "/api/note/updateNote/:id": Requires login
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("No note found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Authentication revoked");
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
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Deleting note with DELETE request by "/api/note/deleteNote/:id": Login required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("No note found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(500).send("Authentication Revoked");
    }
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ Success: "Note deleted", note: deletedNote });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
