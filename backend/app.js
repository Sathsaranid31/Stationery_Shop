import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import productRouter from "./routes/product-routes";
import ordersRouter from "./routes/order-routes";
import cors from "cors";
dotenv.config();

 const app = express();

 //middlewares
 app.use(cors());
 app.use(express.json());
 app.use("/user", userRouter);
 app.use("/admin",adminRouter);
 app.use("/product",productRouter);
 app.use("/order",ordersRouter);

 mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.dotlhbg.mongodb.net/?retryWrites=true&w=majority`
    ).then(() =>
    app.listen(5000, () =>
      console.log("Connected To Database And Server is running")
    )
  )
  .catch((e) => console.log(e));

 




 // fzDeZsZiii5BPEeq