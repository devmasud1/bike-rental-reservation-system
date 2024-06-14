import { z } from "zod";

const bikeValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "Bike name must be a string",
  }),
  description: z.string({
    invalid_type_error: "Description must be a string",
  }),
  pricePerHour: z.number({
    invalid_type_error: "Price per hour must be a number",
  }),
  isAvailable: z.boolean().optional(),
  cc: z.number({
    invalid_type_error: "Engine capacity must be a number",
  }),
  year: z.number({
    invalid_type_error: "Manufacturing year must be a number",
  }),
  model: z.string({
    invalid_type_error: "Model must be a string",
  }),
  brand: z.string({
    invalid_type_error: "Brand must be a string",
  }),
});

const updateBikeValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Bike name must be a string",
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .optional(),
  pricePerHour: z
    .number({
      invalid_type_error: "Price per hour must be a number",
    })
    .optional(),
  isAvailable: z.boolean().optional(),
  cc: z
    .number({
      invalid_type_error: "Engine capacity must be a number",
    })
    .optional(),
  year: z
    .number({
      invalid_type_error: "Manufacturing year must be a number",
    })
    .optional(),
  model: z
    .string({
      invalid_type_error: "Model must be a string",
    })
    .optional(),
  brand: z
    .string({
      invalid_type_error: "Brand must be a string",
    })
    .optional(),
});

export const bikeValidation = {
  bikeValidationSchema,
  updateBikeValidationSchema,
};
