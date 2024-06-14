import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { bikeValidation } from "./bike.validation";
import { BikeController } from "./bike.controller";

const router = express.Router();

router.post(
  "/bikes",
  validateRequest(bikeValidation.bikeValidationSchema),
  BikeController.createBike
);

router.get("/bikes", BikeController.getAllBike);

router.get("/bikes/:bikeId", BikeController.getSingleBike);

router.put("/bikes/:bikeId", BikeController.updateBike);

router.delete("/bikes/:bikeId", BikeController.deleteBike);

export const BikeRoutes = router;
