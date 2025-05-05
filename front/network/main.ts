import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
  LockedError,
} from "@/errors/main";
import { serverAddress } from "@/config/main";
import {
  getCookieStore,
  getCsrfToken,
  getSessionId,
  handleClientCookies,
} from "./utils";

export async function fetchData<T>(input: RequestInfo, init?: RequestInit) {
  if (!init) init = {};

  if (!init.headers) {
    init.headers = {};
  }

  // Set default headers
  init.headers = {
    ...init.headers,
    Accept: "application/json",
  };

  // Only set Content-Type to application/json if the body is not FormData
  if (!(init.body instanceof FormData)) {
    init.headers = {
      ...init.headers,
      "Content-Type": "application/json",
    };
  }
  init.credentials = "include";

  // Retrieve the cookie store
  const cookieStore = await getCookieStore();

  // Retrieve the XSRF token
  const xsrfToken = getCsrfToken(cookieStore);
  let Cookie = "";
  if (xsrfToken) {
    init.headers = {
      ...init.headers,
      "X-CSRFToken": xsrfToken,
    };
    Cookie = Cookie.concat("csrftoken=" + xsrfToken + ";");
  }
  // Retrieve the session ID
  const sessionId = getSessionId(cookieStore);
  if (sessionId) {
    Cookie = Cookie.concat("sessionid=" + sessionId + ";");
  }

  init.headers = {
    ...init.headers,
    Cookie: Cookie,
  };
  if (sessionId) {
    Cookie = Cookie.concat("sessionid=" + sessionId + ";");
  }
  // Set the XSRF token in the headers
  init.headers = {
    ...init.headers,
    Cookie: Cookie,
  };

  try {
    const response = await fetch(serverAddress + input, init);

    // Log the response for debugging
    console.log(
      "Response:",
      await response.clone().json(),
      "Status:",
      response.status
    );

    const setCookies = response.headers.getSetCookie();

    // Handle cookies in the client
    handleClientCookies(setCookies, cookieStore);

    if (response.status === 204 && init.method === "DELETE") {
      return true;
    }

    if (response.ok) {
      return response.json() as Promise<T>;
    } else {
      const errorBody = await response.json();
      const errorMessage = Object.values(errorBody)[0] as string;
      switch (response.status) {
        case 401:
          throw new UnauthorizedError(errorMessage);
        case 409:
          throw new ConflictError(errorMessage);
        case 400:
          throw new BadRequestError(errorMessage);
        case 403:
          throw new ForbiddenError(errorMessage);
        case 404:
          throw new NotFoundError(errorMessage);
        case 423:
          throw new LockedError(errorMessage);
        case 500:
          throw new InternalServerError(errorMessage);
        default:
          throw new Error(
            `Request failed with status: ${response.status} message: ${errorMessage}`
          );
      }
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
