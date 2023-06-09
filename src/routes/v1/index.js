const express = require("express");

const { BookingController } = require("../../controllers/index");

const router = express.Router();
router.post("/bookings", BookingController.create);
router.patch("/bookings", BookingController.destroy);

module.exports = router;
