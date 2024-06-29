import { Booking } from "./booking.model";
import { TBooking } from "./booking.interface";

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

export const BookingService = {
  createBookingIntoDB,
};
