"use server";
import { User } from "@/type/users";
import { LoginSchema, SignupSchema } from "@/lib/schema/auth";
import { State } from "@/lib/schema/base";
import { fetchData } from "@/network/main";
import { UpdateUserSchema } from "./schema/user";

export const login = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const parsed = LoginSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return { success: false, errors: fieldErrors };
  }
  const { email, password } = parsed.data;
  try {
    await fetchData<User>("/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return { success: true, errors: {} };
  } catch (error) {
    return {
      success: false,
      errors: { general: [(error as Error).message] },
    };
  }
};

// Register
export const register = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  const raw = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const parsed = SignupSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return { success: false, errors: fieldErrors };
  }
  const userData = parsed.data;
  try {
    await fetchData<User>("/register/", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    return { success: true, errors: {} };
  } catch (error) {
    return {
      success: false,
      errors: { general: [(error as Error).message] },
    };
  }
};

// Update a user - server action
export const updateUser = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  const id = formData.get("id");
  console.log("ID:", id);

  // Build the update data from form fields
  const updateData = {
    first_name: formData.get("first_name") || undefined,
    last_name: formData.get("last_name") || undefined,
    email: formData.get("email") || undefined,
  };

  const parsed = UpdateUserSchema.safeParse(updateData);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return { success: false, errors: fieldErrors };
  }

  try {
    await fetchData<User>(`/users/${Number(id)}/`, {
      method: "PUT",
      body: JSON.stringify(parsed.data),
    });
    return { success: true, errors: {} };
  } catch (error) {
    return {
      success: false,
      errors: { general: [(error as Error).message] },
    };
  }
};
