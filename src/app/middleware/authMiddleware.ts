import { Request, Response, NextFunction } from "express";
import AppError from "../error/appError";
import httpStatus from "http-status";
import { TUser } from "../modules/user/user.interface";
import { verifyToken } from "../utils/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new AppError(
        httpStatus.UNAUTHORIZED,
        "Authorization header is missing or invalid!"
      )
    );
  }

  const token = authHeader?.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded as Partial<TUser>;
    next();
  } catch (error) {
    next(new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token!"));
  }
};

export const authorize =
  (role: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !role.includes(req.user.role)) {
      return next(
        new AppError(
          httpStatus.FORBIDDEN,
          "You are not authorized to access this route!"
        )
      );
    }
    next();
  };
