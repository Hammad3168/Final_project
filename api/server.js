import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/userRouter.js";
import courseRouter from "./Routes/courseRouter.js";
import enrollmentRouter from "./Routes/enrollmentRouter.js";
import cors from "cors";

dotenv.config();
const app = express();
// Mongoose connection
const dbUrl = process.env.ATLASDB_URL;
mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.log("Database Connection Error:", err));

// Router routes
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/course", courseRouter);
app.use("/api", enrollmentRouter);

// Globel 404 routes protection
app.use((req, res) => {
  res.status(404).send("404 Page Not Found");
});
// creating localhost server
// app.listen(PORT, () => {
//   console.log(`Connect to server ${PORT}`);
// });
module.exports = app;
