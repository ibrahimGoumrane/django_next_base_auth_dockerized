export const devEnv = process.env.NODE_ENV === "development";

export const serverAddress =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
export const imgAddress =
  process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8000";
