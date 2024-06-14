import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { BikeService } from "./bike.service";

const createBike = async (req: Request, res: Response) => {
  try {
    const bikeData = req.body;

    const result = await BikeService.createBikeIntoDB(bikeData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bike added successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to create bike!",
      data: error.message,
    });
  }
};

const getAllBike = async (req: Request, res: Response) => {
  try {
    const result = await BikeService.getAllBikeFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bikes retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Failed to retrieve bikes!",
      data: error.message,
    });
  }
};
const getSingleBike = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;

    const result = await BikeService.getSingleBikeFromDB(bikeId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bikes retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Failed to retrieve bikes!",
      data: error.message,
    });
  }
};

const updateBike = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to update bike data!",
      data: error.message,
    });
  }
};

const deleteBike = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;
    const result = await BikeService.deleteBikeFromDB(bikeId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bike deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete bike!",
      error: error.message,
    });
  }
};

export const BikeController = {
  getAllBike,
  createBike,
  getSingleBike,
  updateBike,
  deleteBike,
};
