import {
  AppError,
  InvalidIdError,
  ValidationMongoError,
  DuplicateKeyError,
} from "./app_errors.js";

function mongoErrorHandler(err, req, res, next) {
  if (err.name === "CastError") {
    return res
      .status(400)
      .json(new InvalidIdError(err.value, req.originalUrl).toJSON());
  }

  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json(new ValidationMongoError(err.message, req.originalUrl).toJSON());
  }

  if (err.code && err.code === 11000) {
    return res
      .status(409)
      .json(new DuplicateKeyError(err.keyValue, req.originalUrl).toJSON());
  }

  next(err);
}

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json(err.toJSON());
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
