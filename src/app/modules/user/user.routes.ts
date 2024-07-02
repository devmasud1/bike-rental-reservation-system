import express from "express";
import { UserController } from "./user.controller";
import { userValidation } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import { authenticate } from "../../middleware/authMiddleware";

const router = express.Router();

//Public routes
router.post(
  "/auth/signup",
  validateRequest(userValidation.userValidationSchema),
  UserController.createUser
);
router.post("/auth/login", UserController.loggedUser);

//Protected routes
router.get("/users", authenticate, UserController.getAllUser);
router.get("/users/me", authenticate, UserController.getProfile);
router.put("/users/me", authenticate, UserController.updateProfile);

export const UserRoutes = router;
