import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error(
      "FATAL ERROR: MONGO_URI is not defined in the environment variables."
    );
    // Exit the process if the connection string is missing
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(
      `Error connecting to MongoDB: ${
        error instanceof Error ? error.message : error
      }`
    );
    // Exit the application upon database connection failure
    process.exit(1);
  }
};

export default connectDB;
