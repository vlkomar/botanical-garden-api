import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import dotenv from "dotenv";

dotenv.config();

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) return next(err);

  console.error(`[Error] ${err.message}`);

  if (err instanceof AppError) {
    if (process.env.NODE_ENV === "development") {
      return res.status(err.statusCode).json({
        success: false,
        stack: err.stack,
        message: err.message,
      });
    } else {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
