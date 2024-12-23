import dotenv from "dotenv"; // Import dotenv
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import { jwtCheck } from "./Middleware/Auth";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log(path.resolve(__dirname, "../.env"));

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected to database"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
app.use(express.json());
// app.use(jwtCheck);
app.get("/health", async (req: Request, res: Response) => {
  res.status(200).send({ message: "Health OK!" });
});
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.listen(8081, () => {
  console.log("server started at port 8081");
});
