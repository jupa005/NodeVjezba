const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.create({
      email,
      username,
      password,
    });

    res.status(201).json({ message: "User created!", user: user.toJSON() });
  } catch (error) {
    res.status(400).json({ message: "Error creating user:", error });
  }
};
