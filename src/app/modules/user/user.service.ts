import { User } from "./user.model";
import { TUser } from "./user.interface";
import AppError from "../../error/appError";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";

//check userExists
const userExists = async (userId: string) => {
  const user = await User.findById(userId);
  return !!user;
};

//create new user
const createUserIntoDB = async (userData: TUser) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  userData.password = hashedPassword;
  const result = await User.create(userData);
  return result;
};

//logged in user
const loggedInUserIntoDB = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found!");
  }

  const isMatch = await bcrypt.compare(password, user?.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
    role: user?.role,
  };
};

//get allUser
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
  loggedInUserIntoDB,
  getAllUserFromDB,
  getUserById,
  updateUser,
};
