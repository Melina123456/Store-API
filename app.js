const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./vars/.env" });

require("express-async-errors");

app = express();

const connectDB = require("./db/connect");

const productsRouter = require("./routes/products.routes");

const notFoundMiddleware = require("./middleware/notfound");
const errorMiddleware = require("./middleware/errorHandler");

//middleware
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send("hello products.");
});

app.use("/api/v1/products", productsRouter);

//product route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.mongo_connect);
    app.listen(port, console.log(`server is listening port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
