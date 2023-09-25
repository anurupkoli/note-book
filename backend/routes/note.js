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

// Fetching Notes with GET request "/api/note/getNote": Login is required
router.get("/getNote", fetchUser, async (req, res) => {
  // Trying to validate user with user token
  let userId = await Note.findOne({ user: req.user.id });\
  // Returning status code 400 with error message if user was not validated
  if (!userId) {
    return res.status(400).json({ error: "Authentication Revoked" });
  }
  // Fetching user notes if user was validated
  try {
    const note = await Note.find({ user: req.user.id });
    return res.status(200).json(note);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
