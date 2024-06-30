import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBooking = async (req: Request, res: Response) => {
  try {
    const rentalData = req.body;

    // if (!userId) {
    //   throw new Error("User ID not found in request");
    // }

    const result = await BookingService.createBookingIntoDB(rentalData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Rental created successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to create rental!",
      data: error.message,
    });
  }
};

const getAllBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getAllBookingDataFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Rentals retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to retrieved rental!",
      data: error.message,
    });
  }
};

const updateBookingIsReturnStatus = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const result = await BookingService.updateBookingIsReturnStatusIntoDB(
      bookingId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bike returned successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to retrieved bike!",
      data: error.message,
    });
  }
};

export const BookingController = {
  createBooking,
  getAllBooking,
  updateBookingIsReturnStatus,
};
