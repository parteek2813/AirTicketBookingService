const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index");

const { createChannel, publishMessage } = require("../utils/messageQueue");
const BINDING_KEY = "REMINDER_SERVICE";
const bookingService = new BookingService();

class BookingController {
  constructor() {}

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const data = { message: "success" };
    publishMessage(channel, BINDING_KEY, JSON.stringify(data));
    return res.status(200).json({
      message: "Successfully published the event",
    });
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        message: "Successfully Completed booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error?.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }
}

// const create = async (req, res) => {
//   try {
//     const response = await bookingService.createBooking(req.body);
//     return res.status(StatusCodes.OK).json({
//       message: "Successfully Completed booking",
//       success: true,
//       err: {},
//       data: response,
//     });
//   } catch (error) {
//     return res.status(error.statusCode).json({
//       message: error?.message,
//       success: false,
//       err: error.explanation,
//       data: {},
//     });

//   }
// };

// const destroy = async (req, res) => {
//   try {
//     const response = await bookingService.deleteBooking(req.body);
//     return res.status(StatusCodes.OK).json({
//       message: "Successfully deleted this booking",
//       success: true,
//       err: {},
//       data: response,
//     });
//   } catch (error) {
//     return res.status(error.statusCode).json({
//       message: error?.message,
//       success: false,
//       err: error.explanation,
//       data: {},
//     });
//   }
// };
// module.exports = { create, destroy };

module.exports = BookingController;
