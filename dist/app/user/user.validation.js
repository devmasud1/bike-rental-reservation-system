"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: "Name must be a string",
    }),
    email: zod_1.z
        .string({
        invalid_type_error: "Email must be a string",
    })
        .email("Invalid email address"),
    password: zod_1.z
        .string({
        invalid_type_error: "Password must be a string",
    })
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(20, { message: "Password cannot be more than 20 characters" }),
    phone: zod_1.z.string({
        invalid_type_error: "Phone number must be a string",
    }),
    address: zod_1.z.string({
        invalid_type_error: "Address must be a string",
    }),
    role: zod_1.z.enum(["admin", "user"], {
        invalid_type_error: "Role must be either 'admin' or 'user'",
    }),
});
const updateValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).max(20).optional(),
    phone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    role: zod_1.z.enum(["admin", "user"]).optional(),
});
exports.userValidation = {
    userValidationSchema,
    updateValidationSchema,
};
