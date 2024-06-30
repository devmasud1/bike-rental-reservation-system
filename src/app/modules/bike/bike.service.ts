import httpStatus from "http-status";
import AppError from "../../error/appError";
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

//check bikeExists
const isBikeExists = async (bikeId: string) => {
  const result = await Bike.findById(bikeId);
  return !!result;
};

//create new bike
const createBikeIntoDB = async (bikeId: TBike) => {
  const result = await Bike.create(bikeId);
  return result;
};

//get all bike
const getAllBikeFromDB = async () => {
  const result = await Bike.find();
  return result;
};
//get single bike
const getSingleBikeFromDB = async (bikeId: string) => {
  const result = await Bike.findById(bikeId);
  return result;
};

//update bike
const updateBikeIntoDB = async (bikeId: string, updateData: Partial<TBike>) => {
  const result = await Bike.findByIdAndUpdate(bikeId, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBikeFromDB = async (bikeId: string) => {
  const deletedBike = await Bike.findByIdAndDelete(bikeId);
  return deletedBike;
};

export const BikeService = {
  isBikeExists,
  createBikeIntoDB,
  getAllBikeFromDB,
  getSingleBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
