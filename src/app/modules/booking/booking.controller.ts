import { NextFunction, Request, Response } from "express";
import { BookingService } from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../error/appError";

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rentalData = req.body;
    const result = await BookingService.createBookingIntoDB(rentalData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Rental created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BookingService.getAllBookingDataFromDB();

    if (Array.isArray(result) && result.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Rentals retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBookingIsReturnStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error) {
    next(error);
  }
};

export const BookingController = {
  createBooking,
  getAllBooking,
  updateBookingIsReturnStatus,
};
