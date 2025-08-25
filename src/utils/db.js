import mongoose from "mongoose";
import { MONGO_URI, ENV } from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (ENV !== "test") {
      console.log(`connected to database: (${ENV}): ${MONGO_URI}`);
    }
  } catch (err) {
    console.error("Error connection:", err.message);
    process.exit(1);
  }
};

export default connectDB;
