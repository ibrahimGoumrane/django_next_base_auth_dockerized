"use client";

export interface CookieOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  sameSite?: "lax" | "strict" | "none" | boolean; // ← FIXED TYPE
  secure?: boolean;
  httpOnly?: boolean;
}

export function getClientCookies() {
  const cookies: { [key: string]: string } = {};
  document.cookie.split(";").forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookies[name] = decodeURIComponent(value);
  });
  return {
    get: (name: string) => {
      const cookieValue = cookies[name];
      return cookieValue ? { value: cookieValue } : undefined;
    },

    getAll: () => {
      return cookies;
    },
    set: (name: string, value: string, options: CookieOptions) =>
      setClientCookie(name, value, options),
  };
}

export function setClientCookie(
  name: string,
  value: string,
  options: CookieOptions
) {
  let cookieStr = `${name}=${encodeURIComponent(value)}`;

  if (options.path) cookieStr += `; path=${options.path}`;
  if (options.expires)
    cookieStr += `; expires=${options.expires.toUTCString()}`;
  if (options.maxAge) cookieStr += `; max-age=${options.maxAge}`;
  if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`;
  if (options.secure) cookieStr += "; secure";
  if (options.httpOnly) cookieStr += "; httponly";

  document.cookie = cookieStr;
}
