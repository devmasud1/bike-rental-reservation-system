import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { bikeValidation } from "./bike.validation";
import { BikeController } from "./bike.controller";
import { authenticate, authorizeAdmin } from "../../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeAdmin,
  validateRequest(bikeValidation.bikeValidationSchema),
  BikeController.createBike
);

router.get("/", BikeController.getAllBike);

router.get("/:bikeId", BikeController.getSingleBike);

router.put(
  "/:bikeId",
  authenticate,
  authorizeAdmin,
  validateRequest(bikeValidation.updateBikeValidationSchema),
  BikeController.updateBike
);

router.delete(
  "/:bikeId",
  authenticate,
  authorizeAdmin,
  BikeController.deleteBike
);

export const BikeRoutes = router;
