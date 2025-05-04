import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export function getCsrfToken(cookieStore: ReadonlyRequestCookies) {
  const csrfToken = cookieStore.get("csrftoken")?.value;
  return csrfToken ? csrfToken : null;
}
export function getSessionId(cookieStore: ReadonlyRequestCookies) {
  const sessionId = cookieStore.get("sessionid")?.value;
  return sessionId ? sessionId : null;
}
export function handleClientCookies(
  setCookies: string[],
  cookieStore: ReadonlyRequestCookies
) {
  // Process all cookies from Set-Cookie headers
  if (setCookies && setCookies.length > 0) {
    setCookies.forEach((cookieString) => {
      // Split the cookie string into the main cookie and its attributes
      const [mainPart, ...attributes] = cookieString.split(";");
      const cookieName = mainPart.split("=")[0].trim();
      const cookieValue = mainPart.split("=")[1].trim();

      const options: { [key: string]: Date | string | number | boolean } = {};
      attributes.forEach((attr) => {
        const parts = attr.trim().split("=");
        const key = parts[0].trim().toLowerCase();
        const value = parts.length > 1 ? parts[1].trim() : true;

        // Convert keys to the format expected by Next.js cookies API
        switch (key) {
          case "expires":
            options.expires = new Date(value as string);
            break;
          case "max-age":
            options.maxAge = Number(value);
            break;
          case "path":
            options.path = value;
            break;
          case "samesite":
            options.sameSite = value;
            break;
          case "secure":
            options.secure = true;
            break;
          case "httponly":
            options.httpOnly = true;
            break;
        }
      });
      // Set the cookie in the client
      cookieStore.set(cookieName, cookieValue, options);
    });
  }
}
