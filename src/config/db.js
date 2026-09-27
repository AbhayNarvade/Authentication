import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.MongoUrl);
        console.log("DB connected successfully");
    } catch (e) {
        console.log("Error occur when trying to connect db ", e.message)
    }
}


export default connectDB;