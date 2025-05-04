import { z } from "zod";

// Fields for login
export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Fields for signup
export const SignupSchema = z
  .object({
    first_name: z.string().min(1, { message: "first_name is required" }),
    last_name: z.string().min(1, { message: "last_name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Define your fields
export const loginRenderedFields = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "name@example.com",
    autoComplete: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "current-password",
    required: true,
  },
];
export const signupRenderedFields = [
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    placeholder: "John",
    autoComplete: "given-name",
    required: true,
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    autoComplete: "family-name",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "name@example.com",
    autoComplete: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "current-password",
    required: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "current-password",
    required: true,
  },
];
