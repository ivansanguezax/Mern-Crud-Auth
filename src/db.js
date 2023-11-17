import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/mernb");
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};
