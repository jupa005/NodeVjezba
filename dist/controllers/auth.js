"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_1.default.create({
            email,
            username,
            password: hashedPassword,
        });
        return res
            .status(201)
            .json({ message: "User created!", user: user.toJSON() });
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating user:", error });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userDoc = yield user_1.default.findOne({ where: { email: email } });
        if (userDoc) {
            const isMatch = yield new Promise((resolve, reject) => {
                bcrypt_1.default.compare(password, userDoc.password, (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
            if (isMatch) {
                // Passwords match; user is authenticated
                return res.status(200).json({ message: "Logged in successfully!" });
            }
            else {
                // Passwords don't match; authentication failed
                return res.status(401).json({ message: "Password is incorrect" });
            }
        }
        else {
            return res.status(401).json({ message: "Authentication failed" });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Your e-mail or password is not correct:",
        });
    }
});
exports.login = login;
