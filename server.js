import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";

import "express-async-errors";

// db and authenticate user
import connectDB from "./db/connect.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Security package
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import cookieParser from "cookie-parser";

// routers
import authRouters from "./routers/authRoutes.js";
import jobRouters from "./routers/jobRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

if (process.env !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

// to be able to passing json data
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());

app.use("/api/v1/users", authRouters);
app.use("/api/v1/jobs", jobRouters);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Port listen on server ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
