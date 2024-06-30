import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import handleZodError from "../error/handleZodError";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateId from "../error/handleDuplicateError"; // Ensure correct path
import AppError from "../error/appError";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: TErrorSources = [{ path: "", message }];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode || 400;
    message = simplifiedError?.message || "Validation Error!";
    errorMessages = simplifiedError?.errorSources || [{ path: "", message }];
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode || 400;
    message = simplifiedError?.message || "Validation Error!";
    errorMessages = simplifiedError?.errorSources || [{ path: "", message }];
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode || 400;
    message = simplifiedError?.message || "Invalid ID";
    errorMessages = simplifiedError?.errorSources || [{ path: "", message }];
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateId(err);
    statusCode = simplifiedError?.statusCode || 400;
    message = simplifiedError?.message || "Duplicate key error";
    errorMessages = simplifiedError?.errorSources || [{ path: "", message }];
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = [{ path: "", message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [{ path: "", message }];
  }

  // response object
  const responseObject = {
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  };

  res.status(statusCode).json(responseObject);
};

export default globalErrorHandler;
