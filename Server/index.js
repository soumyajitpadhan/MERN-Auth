import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173']
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API Endpoints
app.get("/", (req, res) => res.send("API Working fine"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const startServer = async () => {
    try {
        await connectToDB();

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT:${process.env.PORT}`);
        })
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process if DB connection fails
    }
}

startServer();
