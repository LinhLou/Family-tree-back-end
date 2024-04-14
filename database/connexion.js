import mongoose from "mongoose";

const databaseURL = process.env.DATABASE_URL || "mongodb://localhost:27017/tree_family";

const connection = async () => {
  try {
    await mongoose.connect(databaseURL);
    console.log('Connect successfully to the database!');
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export default connection

