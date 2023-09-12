const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "User created!", user: user.toJSON() });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user:", error });
  }
};
