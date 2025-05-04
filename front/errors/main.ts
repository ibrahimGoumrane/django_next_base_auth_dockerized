class HttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * Status Code : 400
 */
export class BadRequestError extends HttpError {}

/**
 * Status Code : 401
 */

export class UnauthorizedError extends HttpError {}

/**
 * Status Code : 403
 */
export class ForbiddenError extends HttpError {}

/**
 * Status Code : 404
 */
export class NotFoundError extends HttpError {}

/**
 * Status Code : 409
 */
export class ConflictError extends HttpError {}

/**
 * Status Code: 423
 */
export class LockedError extends HttpError {}

/**
 * Status Code : 500
 */
export class InternalServerError extends HttpError {}
