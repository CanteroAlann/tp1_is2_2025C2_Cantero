import { AppError, ValidationMongoError } from "./app_errors.js";

/**
 *this function is a middleware to handle MongoDB validation errors in Express.
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
function mongoErrorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json(new ValidationMongoError(err.message, req.originalUrl).toJSON());
  }
  next(err);
}

/**
 *this function is a middleware to handle general errors in Express.
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*} 
 */
function errorHandler(err, req, res, next) {
  console.log(err.name);
  if (err instanceof AppError) {
    return res.status(err.status).json(err.toJSON());
  }
  if (err.name === "SyntaxError") {
    const syntaxError = new AppError({
      status: 400,
      title: "Bad Request",
      detail: "Invalid JSON syntax",
      instance: req.originalUrl,
    });
    return res.status(400).json(syntaxError.toJSON());
  }
  const genericError = new AppError({
    status: 500,
    title: "Internal Server Error",
    detail: err.message || "Unexpected error",
    instance: req.originalUrl,
  });

  res.status(500).json(genericError.toJSON());
}

export { errorHandler, mongoErrorHandler };
