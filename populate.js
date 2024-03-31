require("dotenv").config({ path: "./vars/.env" });

const connectDB = require("./db/connect");

const product = require("./models/product.model");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.mongo_connect);
    //the below line is optional incase there is something glibberish in the db.
    await product.deleteMany();
    await product.create(jsonProducts);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

start();
