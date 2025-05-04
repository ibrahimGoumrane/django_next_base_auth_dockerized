import { z } from "zod";

// Define validation schema for user updates
export const UpdateUserSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .optional(),
  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .optional(),
  email: z.string().email("Invalid email format").optional(),
});

// Define the fields for the user update form
export const userUpdateRenderedFields = [
  {
    name: "id",
    label: "id",
    type: "hidden",
  },
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    placeholder: "John",
    autoComplete: "given-name",
    required: false,
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    autoComplete: "family-name",
    required: false,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "name@example.com",
    autoComplete: "email",
    required: true,
  },
];
