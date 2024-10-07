import express, { urlencoded } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";

dotenv.config();

const origin: string | undefined = process.env.ORIGIN;
const port: string | undefined = process.env.PORT;
const mongo: string | undefined = process.env.MONGO_URI;

const app = express();
if (origin) {
  app.use(
    cors({
      origin: [origin],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
}
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/uploads/profiles",express.static("uploads/profiles"))

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use(errorMiddleware);

if (mongo) {
  mongoose.connect(mongo);
  console.log("Connected to DB");
} else {
  console.log("Error While Connecting to DB");
}
app.listen(port, () => {
  console.log("Connected at " + port);
});
