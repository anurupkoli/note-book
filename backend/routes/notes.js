const Notes = require("../modles/Notes");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Creating new Notes instsance by "/api/notes/createNotes" request
router.post(
  "/createNotes",
  [
    body("title", "Enter a valid title with atleast 3 alphabets").isLength({
      min: 3,
    }),
    body(
      "description",
      "Enter a valid Descritption with alteastt 10 alphabest"
    ).isLength({ min: 10 }),
    body("tag", "Enter a valid tag Ex: General, Student, etc").isString(),
  ],
  async (req, res) => {
    // Checking for any errors w.r.t specified validations
    let erros = await validationResult(req);

    // if errors are found bad request with error message is sent
    if (!erros) {
      res.status(400).json({ erros: erros.message });
    }

    try {
      // Trying to check if specified notes is already present in database
      let notes = await Notes.find({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });
      if (notes) {
        return res.status(400).json({ error: "This file already exists" });
      }

      // Pushing Notes data to database
      notes = await Notes.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.title,
      });
      res.status(200).send(notes);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ errors: error.message });
    }
  }
);

module.exports = router;
