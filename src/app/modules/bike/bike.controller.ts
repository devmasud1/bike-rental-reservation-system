import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { BikeService } from "./bike.service";
import AppError from "../../error/appError";

const createBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bikeData = req.body;

    const result = await BikeService.createBikeIntoDB(bikeData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bike added successfully",
      data: {
        _id: result._id,
        name: result.name,
        description: result.description,
        pricePerHour: result.pricePerHour,
        isAvailable: result.isAvailable,
        cc: result.cc,
        year: result.year,
        model: result.model,
        brand: result.brand,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BikeService.getAllBikeFromDB();

    if (Array.isArray(result) && result.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bikes retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleBike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bikeId } = req.params;

  try {
    const result = await BikeService.getSingleBikeFromDB(bikeId);

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "Bike not found");
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bike retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bikeId } = req.params;
    const updatedData = req.body;

    const result = await BikeService.updateBikeIntoDB(bikeId, updatedData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bike updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bikeId } = req.params;
    const result = await BikeService.deleteBikeFromDB(bikeId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bike deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BikeController = {
  getAllBike,
  createBike,
  getSingleBike,
  updateBike,
  deleteBike,
};
