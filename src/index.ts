import dotenv from "dotenv"; // Import dotenv
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { jwtCheck } from "./Middleware/Auth";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log(path.resolve(__dirname, "../.env"));

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected to database"));

const app = express();
app.use(cors());
app.use(express.json());
// app.use(jwtCheck);
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK!" });
});
app.use("/api/my/user", myUserRoute);
app.listen(8081, () => {
  console.log("server started at port 8081");
});
