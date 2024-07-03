import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../error/appError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const result = await UserService.createUserIntoDB(userData);

    //set refresh token as cookie
    res.cookie("refreshToken", result.tokens.refreshToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User registered successfully",
      data: {
        _id: result.user?._id,
        name: result.user?.name,
        email: result.user?.email,
        phone: result.user?.phone,
        address: result.user?.address,
        role: result.user?.role,
        createdAt: result.user?.createdAt,
        updatedAt: result.user?.updatedAt,
        __v: result.user.__v,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loggedUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Email and password are required"
      );
    }

    const result = await UserService.loggedInUserIntoDB(email, password);

    //set refresh token as cookie
    res.cookie("refreshToken", result.tokens.refreshToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully",
      token: result.tokens.accessToken,
      data: {
        _id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        phone: result.user.phone,
        address: result.user.address,
        role: result.user.role,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt,
        __v: result.user.__v,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.user as { role: string };
    const result = await UserService.getAllUserFromDB(role);

    if (Array.isArray(result) && result.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, "No Data Found!");
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.userId;

    const user = await UserService.getProfileById(userId);

    if (!user) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "No Data Found",
        data: [],
      });
    }

    //send response without password
    const { password, ...profileWithoutPassword } = user.toObject();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile retrieved successfully",
      data: profileWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const updatedData = req.body;

    const result = await UserService.updateProfile(userId, updatedData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
  loggedUser,
  getAllUser,
  getProfile,
  updateProfile,
};
