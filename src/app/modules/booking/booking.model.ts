import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Bike",
    },
    startTime: {
      type: String,
      required: true,
    },
    returnTime: {
      type: String,
    },
    totalCost: {
      type: Number,
      required: true,
      default: 0,
    },
    isReturned: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export const Booking = model<TBooking>("Booking", bookingSchema);
