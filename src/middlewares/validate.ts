import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { ZodError, ZodType } from "zod";

export const validate =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessage = err.issues
          .map((issue) => {
            const path = issue.path.length > 0 ? issue.path.join(".") : "body";
            return `${path}: ${issue.message}`;
          })
          .join("; ");
        return next(new AppError(errorMessage, 400));
      }
      return next(err);
    }
  };
