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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
const validationMiddleware = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const userDoc = yield user_1.default.findOne({ where: { email: value } });
        if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
        }
    })),
    (0, express_validator_1.body)("password").trim().isLength({ min: 5 }),
    (0, express_validator_1.body)("username").trim().not().isEmpty(),
];
router.post("/signup", validationMiddleware, auth_1.signup);
router.post("/login", auth_1.login);
exports.default = router;
