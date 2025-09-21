import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { app, server, io, } from "./socket/socket.js";
import cors from "cors";
import connectDB from "./db/connection.DB.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";

// const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

//middleware for handling errors
import { errorHandler } from "./middlewares/error.middleware.js";
app.use(errorHandler);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port: http://localhost:${PORT}`);
});
