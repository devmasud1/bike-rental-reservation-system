import express from "express";
import { UserController } from "./user.controller";
import { userValidation } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import { authenticate } from "../../middleware/authMiddleware";

const authRouter = express.Router();
const userRouter = express.Router();

//public routes
authRouter.post(
  "/signup",
  validateRequest(userValidation.userValidationSchema),
  UserController.createUser
);
authRouter.post("/login", UserController.loggedUser);

//protected routes
userRouter.get("/", authenticate, UserController.getAllUser);
userRouter.get("/me", authenticate, UserController.getProfile);
userRouter.put(
  "/me",
  authenticate,
  validateRequest(userValidation.updateValidationSchema),
  UserController.updateProfile
);

export const AuthRouter = authRouter;
export const UserRoutes = userRouter;
