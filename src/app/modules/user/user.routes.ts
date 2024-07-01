import express from "express";
import { UserController } from "./user.controller";
import { userValidation } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/auth/signup",
  validateRequest(userValidation.userValidationSchema),
  UserController.createUser
);
router.post("/auth/login", UserController.loggedUser);

router.get("/users", UserController.getAllUser);
router.get("/users/me/:userId", UserController.getUserById);
router.put("/users/me/:userId", UserController.updateUser);

export const UserRoutes = router;
