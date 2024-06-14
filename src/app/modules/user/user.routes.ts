import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../middleware/validateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/auth/signup",
  validateRequest(userValidation.userValidationSchema),
  UserController.createUser
);

router.get("/users/me/:userId", UserController.getUserById);

router.put("/users/me/:userId", UserController.updateUser);

export const UserRoutes = router;
