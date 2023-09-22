const { Schema } = require("mongoose");
const User = require("../modles/User");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Creating a new User by "/api/auth/createUser" POST request
router.post(
  "/createUser",
  [
    body("name", "Enter your full name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Create a strong password").isStrongPassword(),
  ],
  async (req, res) => {
    const errors = await validationResult(req);

    // If we found any errors, we return Bad Request with errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If we found no errors then we check whether user with this email already exists in database
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Some Error occured"})
    }

    res.send(user);
  }
);

module.exports = router;
