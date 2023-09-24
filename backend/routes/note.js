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
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: "Enter valid Note" });
    }

    try {
      const { title, description, tag } = req.body;
      const note = Note.create({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.status(200).json(note);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
