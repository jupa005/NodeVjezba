import express, { Request, Response, NextFunction } from "express";
import { body, ValidationChain } from "express-validator";
import { signup, login } from "../controllers/auth";
import User from "../models/user";

const router = express.Router();

const validationMiddleware: ValidationChain[] = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom(async (value: string, { req }) => {
      const userDoc = await User.findOne({ where: { email: value } });
      if (userDoc) {
        return Promise.reject("E-Mail address already exists!");
      }
    }),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().not().isEmpty(),
];

router.post("/signup", validationMiddleware, signup);

router.post("/login", login);

export default router;
