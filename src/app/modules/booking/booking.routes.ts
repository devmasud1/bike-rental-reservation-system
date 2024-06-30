import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post(
  "/rentals",

  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingController.createBooking
);

router.get("/rentals", BookingController.getAllBooking);
router.put(
  "/rentals/:id/return",
  BookingController.updateBookingIsReturnStatus
);

export const BookingRoutes = router;
