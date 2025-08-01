const mongoose = require("mongoose");
require("dotenv").config(); // Load env variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Use env variable
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
