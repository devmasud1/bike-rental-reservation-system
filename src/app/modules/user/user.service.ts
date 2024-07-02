import { User } from "./user.model";
import { TUser } from "./user.interface";
import AppError from "../../error/appError";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";

// Check if user exists
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

  //generate tokens for the new user
  const accessToken = generateToken(result._id.toString(), result.role);
  const refreshToken = generateToken(result._id.toString(), result.role);

  return {
    user: result,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

//Logged in user
const loggedInUserIntoDB = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Invalid credentials");
  }

  const accessToken = generateToken(user._id.toString(), user.role);
  const refreshToken = generateToken(user._id.toString(), user.role);

  return {
    user,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

//get all profile only admin
const getAllUserFromDB = async (role: string) => {
  if (role !== "admin") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to access this route"
    );
  }
  const result = await User.find();
  return result;
};

//get single profile
const getProfileById = async (userId: string) => {
  const user = await User.findById(userId);
  return user;
};

//update profile
const updateProfile = async (userId: string, updateData: Partial<TUser>) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
  console.log("user", user);

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found or update failed!"
    );
  }

  const { _id, name, email, phone, address, role } = user;

  return { _id, name, email, phone, address, role };
};

export const UserService = {
  userExists,
  createUserIntoDB,
  loggedInUserIntoDB,
  getAllUserFromDB,
  getProfileById,
  updateProfile,
};
