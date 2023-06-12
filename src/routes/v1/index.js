const express = require("express");

const { BookingController } = require("../../controllers/index");
// const { createChannel } = require("../../utils/errors/messageQueue");

// const channel = await createChannel();

const bookingController = new BookingController();
const router = express.Router();

router.post("/bookings", bookingController.create);
router.post("/publish", bookingController.sendMessageToQueue);
// router.patch("/bookings", BookingController.destroy);

module.exports = router;
