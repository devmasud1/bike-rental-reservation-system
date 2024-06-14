import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import sendResponse from "../utils/sendResponse";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const result = await UserService.createUserIntoDB(userData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to create user!",
      data: error.message, // Send error message for clarity
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.getUserById(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Failed to retrieve user profile!",
      data: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    const result = await UserService.updateUser(userId, updatedData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to update user profile!",
      data: error.message,
    });
  }
};

export const UserController = {
  createUser,
  getUserById,
  updateUser,
};
