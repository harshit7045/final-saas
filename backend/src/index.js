import connectDB from "./db/db.js";
import dotenv from "dotenv";
import paymentRouter from "./features/payments/paymentRouter.js";
import userRouter from "./features/users/userRouter.js";
import { app } from "./app.js";
import emailRouter from "./features/email/emailRouter.js";
import imageRouter from "./features/image/imageRouter.js";
import phoneRouter from "./features/phonenumber/phoneRouter.js";
import socialMediaRouter from "./features/socialmedia/socialMediaRouter.js";
import express from "express";

dotenv.config({ path: "./src/.env" });
const port = process.env.PORT || 7000;
connectDB()
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error(error);
    connectDB();
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.urlencoded({ extended: true }));

app.use("/api/payment", paymentRouter);
app.use("/api/user", userRouter);
app.use("/api/emailosint", emailRouter);
app.use("/api/imageosint", imageRouter);
app.use("/api/phoneosint", phoneRouter);
app.use("/api/socialmediaosint",socialMediaRouter); 