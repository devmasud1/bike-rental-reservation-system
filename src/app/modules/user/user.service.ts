import { User } from "./user.model";
import { TUser } from "./user.interface";

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

//get single user
const getUserById = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found!");
  }
  return user;
};

//update user
// const updateUser = async (userId: string, updateData: Partial<TUser>) => {
//   const user = await User.findByIdAndUpdate(userId, updateData, {
//     new: true,
//     runValidators: true,
//   });
//   if (!user) {
//     throw new Error("User not found or update failed!");
//   }
//   return user;
// };
const updateUser = async (userId: string, updateData: Partial<TUser>) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new Error("User not found or update failed!");
  }

  // Extract only the fields those i want to send the response
  const { _id, name, email, phone, address, role } = user;

  return { _id, name, email, phone, address, role };
};

export const UserService = {
  userExists,
  createUserIntoDB,
  getUserById,
  updateUser,
};
