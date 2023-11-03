import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "User name is required",
    })
    .min(3)
    .max(255),
  email: z
    .string({
      required_error: "Email is required",
      invalid_error: "Invalid email",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6)
    .max(255),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_error: "Invalid email",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6)
    .max(255),
});
