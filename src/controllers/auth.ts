import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import User from "../models/user";

export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email: string = req.body.email;
    const username: string = req.body.username;
    const password: string = req.body.password;

    const hashedPassword: string = await bcrypt.hash(password, 10);

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

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const userDoc = await User.findOne({ where: { email: email } });
    if (userDoc) {
      const isMatch = await new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(password, userDoc.password, (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      if (isMatch) {
        // Passwords match; user is authenticated
        return res.status(200).json({ message: "Logged in successfully!" });
      } else {
        // Passwords don't match; authentication failed
        return res.status(401).json({ message: "Password is incorrect" });
      }
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Your e-mail or password is not correct:",
    });
  }
};
