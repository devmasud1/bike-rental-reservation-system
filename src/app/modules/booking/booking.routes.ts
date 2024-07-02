import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";
import { authenticate } from "../../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/rentals",
  authenticate,
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingController.createBooking
);

router.get("/rentals", BookingController.getAllBooking);
router.put(
  "/rentals/:id/return",
  BookingController.updateBookingIsReturnStatus
);

export const BookingRoutes = router;
