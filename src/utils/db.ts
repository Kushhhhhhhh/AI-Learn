import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {

  if (isConnected) {
    return;
  }

  try {
    const dbUri = process.env.MONGODB_URI as string; 
    if (!dbUri) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    const dbConnection = await mongoose.connect(dbUri);
    isConnected = !!dbConnection.connections[0].readyState;
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Database connection failed.");
  }
};