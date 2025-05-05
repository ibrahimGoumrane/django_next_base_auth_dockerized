import { CookieOptions } from "./cookies/cookies.client";

type CookieStore = {
  get: (name: string) => { value: string } | undefined;
  set: (name: string, value: string, options: CookieOptions) => void;
};

export async function getCookieStore() {
  if (typeof window === "undefined") {
    const { getServerCookies } = await import("./cookies/cookies.server");
    return getServerCookies();
  } else {
    const { getClientCookies } = await import("./cookies/cookies.client");
    return getClientCookies();
  }
}

export function getCsrfToken(cookieStore: CookieStore): string | null {
  const csrfToken = cookieStore.get("csrftoken")?.value;
  return csrfToken ?? null;
}

export function getSessionId(cookieStore: CookieStore): string | null {
  const sessionId = cookieStore.get("sessionid")?.value;
  return sessionId ?? null;
}
export function handleClientCookies(
  setCookies: string[],
  cookieStore: CookieStore
) {
  // Process all cookies from Set-Cookie headers
  if (setCookies && setCookies.length > 0) {
    setCookies.forEach((cookieString) => {
      // Split the cookie string into the main cookie and its attributes
      const [mainPart, ...attributes] = cookieString.split(";");
      const cookieName = mainPart.split("=")[0].trim();
      const cookieValue = mainPart.split("=")[1].trim();

      // Convert attributes into an object
      const options: CookieOptions = {};
      attributes.forEach((attr) => {
        const [key, val] = attr.trim().split("=");
        const lowerKey = key.toLowerCase();

        switch (lowerKey) {
          case "expires":
            options.expires = new Date(val);
            break;
          case "max-age":
            options.maxAge = Number(val);
            break;
          case "path":
            options.path = val;
            break;
          case "samesite":
            options.sameSite = val.toLowerCase() as "strict" | "lax" | "none";
            break;
          case "secure":
            options.secure = true;
            break;
          case "httponly":
            options.httpOnly = true;
            break;
        }
      });
      cookieStore.set(cookieName, cookieValue, options);
    });
  }
}
