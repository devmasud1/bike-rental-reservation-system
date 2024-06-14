"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
//check userExists
const userExists = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    return !!user;
});
//create new user
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userData);
    return result;
});
//get single user
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new Error("User not found!");
    }
    return user;
});
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
const updateUser = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        throw new Error("User not found or update failed!");
    }
    // Extract only the fields those i want to send the response
    const { _id, name, email, phone, address, role } = user;
    return { _id, name, email, phone, address, role };
});
exports.UserService = {
    userExists,
    createUserIntoDB,
    getUserById,
    updateUser,
};
