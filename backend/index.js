const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv/config");

// get env variables from dotenv
const api = process.env.API_URL;

// enable CORS
app.use(cors());
app.options("*", cors);

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

//Routes
const ordersRoutes = require("./routes/orders");

app.use(`${api}/orders`, ordersRoutes);

// MongoDB Schemas

// Connect to mongoDB
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "hrapp",
  })
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`${api}`);
  console.log(`Server is running on http://localhost:${port}`);
});
