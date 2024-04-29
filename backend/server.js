import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieRouter from "./src/routes/cookie.js";
import userRouter from "./src/routes/user.js";
const app = express();

dotenv.config();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Home");
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cors());

app.use(cookieRouter);
app.use(userRouter);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connect successfully !");
  })
  .catch(() => {
    console.log("Connect failed !");
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
