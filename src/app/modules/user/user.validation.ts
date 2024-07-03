import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "Name must be a string",
  }),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password cannot be more than 20 characters" }),

  phone: z.string({
    invalid_type_error: "Phone number must be a string",
  }),

  address: z.string({
    invalid_type_error: "Address must be a string",
  }),

  role: z.enum(["admin", "user"], {
    invalid_type_error: "Role must be either 'admin' or 'user'",
  }),
});

const updateValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(20).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(["admin", "user"]).optional(),
});

export const userValidation = {
  userValidationSchema,
  updateValidationSchema,
};
