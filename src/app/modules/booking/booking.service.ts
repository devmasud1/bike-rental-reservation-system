import { Booking } from "./booking.model";
import { TBooking } from "./booking.interface";
import { Bike } from "../bike/bike.model";

const createBookingIntoDB = async (bookingData: TBooking) => {
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

const getAllBookingDataFromDB = async () => {
  const results = await Booking.find();

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
    throw new Error("Rental not found");
  }
  if (booking.isReturned) {
    throw new Error("Bike is already returned");
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
