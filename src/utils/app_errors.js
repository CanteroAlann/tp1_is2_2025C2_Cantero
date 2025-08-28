/**
 *class representing a custom application error.
 its returns a JSON following the RFC 7807 standard.
 *
 * @class AppError
 * @extends {Error}
 */

class AppError extends Error {
  constructor({
    type = "about:blank",
    title = "An error occurred",
    status = 500,
    detail = "Unexpected error",
    instance = "",
  }) {
    super(detail);
    this.type = type;
    this.title = title;
    this.status = status;
    this.detail = detail;
    this.instance = instance;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      type: this.type,
      title: this.title,
      status: this.status,
      detail: this.detail,
      instance: this.instance,
    };
  }
}

/**
 *class representing a "Not Found" error.
 *
 * @class NotFoundError
 * @extends {AppError}
 */
class NotFoundError extends AppError {
  constructor(detail = "The requested resource was not found", instance = "") {
    super({
      type: "https://example.com/probs/not-found",
      title: "Resource Not Found",
      status: 404,
      detail,
      instance,
    });
  }
}

/**
 *class representing a "Bad Request" error.
 *
 * @class BadRequestError
 * @extends {AppError}
 */
class BadRequestError extends AppError {
  constructor(detail = "Bad request", instance = "") {
    super({
      type: "https://example.com/probs/bad-request",
      title: "Bad Request",
      status: 400,
      detail,
      instance,
    });
  }
}


/**
 *class representing a "Forbidden" error.
 *
 * @class ForbiddenError
 * @extends {AppError}
 */
class ForbiddenError extends AppError {
  constructor(detail = "Forbidden", instance = "") {
    super({
      type: "https://example.com/probs/forbidden",
      title: "Forbidden",
      status: 403,
      detail,
      instance,
    });
  }
}

/**
 *class representing a "Validation MongoDB" error.
 *
 * @class ValidationMongoError
 * @extends {AppError}
 */
class ValidationMongoError extends AppError {
  constructor(message, instance = "") {
    super({
      type: "https://example.com/probs/validation-error",
      title: "Validation Error",
      status: 400,
      detail: message,
      instance,
    });
  }
}

export {
  AppError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  ValidationMongoError,
};
