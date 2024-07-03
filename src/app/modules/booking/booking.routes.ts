import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";
import { authenticate, authorizeAdmin } from "../../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  authenticate,
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingController.createBooking
);

router.get("/", authenticate, BookingController.getAllBooking);
router.put(
  "/:id/return",
  authenticate,
  authorizeAdmin,
  BookingController.updateBookingIsReturnStatus
);

export const BookingRoutes = router;
