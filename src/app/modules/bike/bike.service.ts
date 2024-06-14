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
  if (!result) {
    throw new Error("bike not found!");
  }
  return result;
};
//get single bike
const getSingleBikeFromDB = async (bikeId: string) => {
  const result = await Bike.findById(bikeId);
  if (!result) {
    throw new Error("bike not found!");
  }
  return result;
};

//update bike
const updateBikeIntoDB = async (bikeId: string, updateData: Partial<TBike>) => {
  const result = await Bike.findByIdAndUpdate(bikeId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new Error("Bike not found or update failed!");
  }

  return result;
};

const deleteBikeFromDB = async (bikeId: string) => {
  try {
    const deletedBike = await Bike.findByIdAndDelete(bikeId);

    if (!deletedBike) {
      throw new Error("Bike not found or deletion failed");
    }
    return deletedBike;
  } catch (error) {}
};

export const BikeService = {
  isBikeExists,
  createBikeIntoDB,
  getAllBikeFromDB,
  getSingleBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
