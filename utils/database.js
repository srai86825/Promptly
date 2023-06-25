import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
  if (isConnected) {
    console.log("DB already connected");
    return;
  }

  try {
    mongoose.connect(process.env.MONGO_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
    isConnected = true;
  } catch (err) {
    console.log("ERROR from database.js:"+err);
  }
};
