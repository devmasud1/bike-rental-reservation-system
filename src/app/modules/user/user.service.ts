import { User } from "./user.model";
import { TUser } from "./user.interface";
import AppError from "../../error/appError";
import httpStatus from "http-status";

//check userExists
const userExists = async (userId: string) => {
  const user = await User.findById(userId);
  return !!user;
};

//create new user
const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

//getallUser
const getAllUserFromDB = async () => {
  const result = User.find();
  return result;
};

//get single user
const getUserById = async (userId: string) => {
  const user = await User.findById(userId);
  return user;
};

//update user
const updateUser = async (userId: string, updateData: Partial<TUser>) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found or update failed!"
    );
  }

  // Extract only the fields those i want to send the response
  const { _id, name, email, phone, address, role } = user;

  return { _id, name, email, phone, address, role };
};

export const UserService = {
  userExists,
  createUserIntoDB,
  getAllUserFromDB,
  getUserById,
  updateUser,
};
