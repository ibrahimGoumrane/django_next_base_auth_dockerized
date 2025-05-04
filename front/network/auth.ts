import { User } from "@/type/users";
import { fetchData } from "./main";

export const getLoggedInUser = async () => {
  try {
    return (await fetchData<User>("/check_auth/")) as User;
  } catch {
    return null;
  }
};

// Logout
export const logout = async (): Promise<boolean> => {
  await fetchData("/logout/", {
    method: "POST",
  });
  return true;
};
