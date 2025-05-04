import { User } from "@/type/users";
import { fetchData } from "./main";

// Fetch all users - regular async function
export const fetchUsers = async (): Promise<User[]> => {
  return (await fetchData<User[]>("/users/", {
    method: "GET",
  })) as User[];
};

// Fetch a single user - regular async function
export const fetchUser = async (id: number): Promise<User> => {
  return (await fetchData<User>(`/users/${id}/`, {
    method: "GET",
  })) as User;
};

// Delete a user - server action
export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    await fetchData(`/users/${id}/`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};
