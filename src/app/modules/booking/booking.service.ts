import { Booking } from "./booking.model";
import { TBooking } from "./booking.interface";
import { Bike } from "../bike/bike.model";
import AppError from "../../error/appError";
import httpStatus from "http-status";
import { Types } from "mongoose";

const { ObjectId } = Types;

const createBookingIntoDB = async (bookingData: TBooking) => {
  const bikeId = bookingData.bikeId;

  //check bike available or not
  const bike = await Bike.findById(bikeId);
  if (!bike || !bike.isAvailable) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      "selected bike is not available for rental!"
    );
  }

  //set bike availability to false
  bike.isAvailable = false;
  await bike.save();

  //create new booking
  const result = await Booking.create(bookingData);

  //format the response data
  const responseData = {
    _id: result._id,
    userId: result.userId,
    bikeId: result.bikeId,
    startTime: result.startTime,
    returnTime: result.returnTime || null,
    totalCost: result.totalCost,
    isReturned: result.isReturned,
  };

  return responseData;
};

const getAllBookingDataFromDB = async (userId: string) => {
  if (!ObjectId.isValid(userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user ID format.");
  }

  const results = await Booking.find({ userId: new ObjectId(userId) });

  //format the response data
  const responseData = results.map((result) => ({
    _id: result._id,
    userId: result.userId,
    bikeId: result.bikeId,
    startTime: result.startTime,
    returnTime: result.returnTime || null,
    totalCost: result.totalCost,
    isReturned: result.isReturned,
  }));

  return responseData;
};

const updateBookingIsReturnStatusIntoDB = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found!");
  }
  if (booking.isReturned) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Bike is already returned!");
  }

  //calculate the cost
  const pricePerHour = 15;
  const returnTime = new Date();
  const startTime = new Date(booking?.startTime);
  const bookingDurationInHour =
    Math.ceil(returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  const totalCost = bookingDurationInHour * pricePerHour;

  //update booking data
  booking.returnTime = returnTime;
  booking.totalCost = totalCost;
  booking.isReturned = true;
  await booking.save();

  //update availability status
  const bike = await Bike.findById(booking.bikeId);

  if (bike) {
    bike.isAvailable = true;
    await bike.save();
  }

  //formate the response data
  const bookingResponseData = {
    _id: booking._id,
    userId: booking.userId,
    bikeId: booking.bikeId,
    startTime: booking.startTime.toISOString(),
    returnTime: booking.returnTime.toISOString(),
    totalCost: Math.round(totalCost * 100) / 100,
    isReturned: booking.isReturned,
  };

  return bookingResponseData;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingDataFromDB,
  updateBookingIsReturnStatusIntoDB,
};
