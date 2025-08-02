import * as z from "zod";
const email = z.string().email({ message: "Enter a valid email address" });

const password = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Must contain an uppercase letter" })
  .regex(/[0-9]/, { message: "Must contain a number" })
  .regex(/[^A-Za-z0-9]/, { message: "Must contain a special character" });

export const signupSchema = z.object({
  email,
  password,
});

export const loginSchema = z.object({
  email,
  password,
  role: z.enum(["learner", "educator"], { required_error: "Role is required" }),
});
