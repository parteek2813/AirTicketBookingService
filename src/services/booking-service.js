const axios = require("axios");
const { BookingRepository } = require("../repository/index");
const { ServiceError } = require("../utils/errors");

const FLIGHT_SERVICE_PATH = "http://localhost:3000";

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  //Inside data object ==> flightid, userid, noOfSeats
  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightRequestUrl);
      //   return flight.data.data;

      const flightData = response.data.data;
      let priceOfTheFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong",
          "Insufficient Seats in the flight"
        );
      }

      const totalCost = priceOfTheFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;

      await axios.patch(updateFlightRequestUrl, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });

      const finalBooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });
      return finalBooking;
    } catch (error) {
      console.log(error);
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
