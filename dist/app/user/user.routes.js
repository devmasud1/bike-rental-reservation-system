"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/auth/signup", (0, validateRequest_1.default)(user_validation_1.userValidation.userValidationSchema), user_controller_1.UserController.createUser);
router.get("/users/me/:userId", user_controller_1.UserController.getUserById);
router.put("/users/me/:userId", user_controller_1.UserController.updateUser);
exports.UserRoutes = router;
