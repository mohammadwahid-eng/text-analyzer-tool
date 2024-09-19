import mongoose from "mongoose";

const mongoDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  try {
    await mongoose.connect(mongoUri!);
    console.log('Database connected!!!')
  } catch(error) {
    console.error(`Failed to connect database: ${error}`);
    process.exit(1);
  }
}

export const connect = async () => {
  await mongoDB();
}