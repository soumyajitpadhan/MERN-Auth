import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectToDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`);
        console.log("Database Connected");
    }
    catch (error) {
        console.log("Failed to connect DB");
        console.error(error);
        process.exit(1); // Exit the process if DB connection fails
    }
}

export default connectToDB;