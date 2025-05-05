"use server";
import { cookies } from "next/headers";

export async function getServerCookies() {
  const cookieStore = await cookies();
  return cookieStore;
}
