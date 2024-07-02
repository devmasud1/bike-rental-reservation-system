import jwt from "jsonwebtoken";
import AppError from "../error/appError";
import httpStatus from "http-status";
import { TUser } from "../modules/user/user.interface";
import config from "../config";

const secretKey = config.JWT_ACCESS_TOKEN as string;

if (!secretKey) {
  throw new AppError(httpStatus.NOT_FOUND, "JWT secret key must be defined");
}

export const generateToken = (userId: string, role: string) => {
  const payload = { userId, role };
  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
};

export const verifyToken = (token: string): Partial<TUser> => {
  try {
    const decodedToken = jwt.verify(token, secretKey) as Partial<TUser>;

    return decodedToken;
  } catch (err) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token!");
  }
};
