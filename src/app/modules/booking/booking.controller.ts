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
    const rentalData = {
      userId: req.user?.userId,
      bikeId: req.body.bikeId,
      startTime: new Date(req.body.startTime),
      isReturned: false,
    };

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
    const userId = req.user?.userId;
    console.log("id", userId);

    if (!userId) {
      throw new AppError(httpStatus.BAD_REQUEST, "User ID not found!");
    }

    const booking = await BookingService.getAllBookingDataFromDB(userId);

    if (booking.length === 0) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "No Rentals Found for the User!",
        data: [],
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Rentals retrieved successfully",
      data: booking,
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
