const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = 3002;

const apiRoutes = require("./routes/index");
const db = require("./models/index");

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/bookingservice/api/v1/home", (req, res) => {
    return res.json({ message: "Hitting the booking server" });
  });

  app.use("/bookingservice/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    // db.sequelize.sync({ alter: true });
  });
};

setupAndStartServer();
