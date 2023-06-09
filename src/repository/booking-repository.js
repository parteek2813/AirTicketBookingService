const { StatusCodes } = require("http-status-codes");

const { Booking } = require("../models/index");
const { ValidationError, AppError } = require("../utils/errors/index");

class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot create Booking",
        "There was some issue creating a booking, Please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (data.status) {
        //if data.status is present then only update bookingStatus
        booking.status = data.status;
      }
      await booking.save();
      return booking;
    } catch (error) {
      throw new AppError(
        "RepositoryError",
        "Cannot update Booking",
        "There was some issue updating a booking, Please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async delete(flightId) {
    try {
      const booking = await Booking.destroy({
        where: {
          id: flightId,
        },
      });
      return true;
    } catch (error) {
      throw new AppError(
        "RepositoryError",
        "Cannot delete Booking",
        "There was some issue deleting a booking, Please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
