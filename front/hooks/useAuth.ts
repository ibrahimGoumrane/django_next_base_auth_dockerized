// "use client";
// import { useEffect, useState } from "react";
// import { UnauthorizedError } from "../errors/main";
// import {
//   getLoggedInUser,
//   login as loginApi,
//   logout as logoutApi,
//   register,
// } from "../network/auth";
// import { updateUser } from "@/network/users";
// import { signUp } from "../type/auth";
// import { UpdateUser, User } from "@/type/users";
// import { useRouter } from "next/navigation";
// interface AuthContext {
//   fetchUser?: boolean;
// }
// export const useAuth = ({ fetchUser = true }: AuthContext = {}) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();
//   useEffect(() => {
//     async function checkUser() {
//       try {
//         const Newuser = await getLoggedInUser();
//         if (Newuser) {
//           setIsAuthenticated(true);
//           setUser(Newuser);
//         }
//       } catch (error) {
//         if (error instanceof UnauthorizedError) {
//           setIsAuthenticated(false);
//           setUser(null);
//         }
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (fetchUser) {
//       checkUser();
//     }
//   }, []);

//   const login = async (email: string, password: string): Promise<User> => {
//     const user = await loginApi(email, password);
//     router.push("/dashboard");
//     return user;
//   };

//   const signup = async (user: signUp): Promise<User> => {
//     const newUser = await register(user);
//     router.push("/dashboard");
//     return newUser;
//   };

//   const userUpdate = async (data: UpdateUser): Promise<User | null> => {
//     if (!user) return null;
//     const updatedUser = await updateUser(user?.id, data);
//     setUser(updatedUser);
//     return updatedUser;
//   };

//   const logout = async () => {
//     await logoutApi();
//     router.push("/auth/login");
//     setUser(null);
//   };

//   return {
//     isAuthenticated,
//     loading,
//     user,
//     login,
//     signup,
//     logout,
//     userUpdate,
//   };
// };
