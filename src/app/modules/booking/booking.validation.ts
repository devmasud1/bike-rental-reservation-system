import { z } from "zod";

const createBookingValidationSchema = z.object({
  bikeId: z.string({
    invalid_type_error: "Bike ID must be string",
    required_error: "Bike ID is required",
  }),
  startTime: z
    .string({
      invalid_type_error: "Start time must be a string",
      required_error: "Start time is required",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start time format",
    }),
  returnTime: z.string().optional(),
  totalCost: z
    .number({
      invalid_type_error: "Total cost must be a number",
      required_error: "Total cost is required",
    })
    .min(0, { message: "Total cost must be a positive number" })
    .optional(),
  isReturned: z
    .boolean({
      invalid_type_error: "isReturned must be a boolean",
      required_error: "isReturned is required",
    })
    .default(false),
});

const updateBookingValidationSchema = z.object({
  returnTime: z
    .string({
      invalid_type_error: "Return time must be string",
    })
    .optional(),
  totalCost: z
    .number({
      invalid_type_error: "Total cost must be a number",
    })
    .min(0, { message: "Total cost must be a positive number" })
    .optional(),
  isReturned: z
    .boolean({
      invalid_type_error: "isReturned must be a boolean",
    })
    .optional(),
});

export const BookingValidation = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
