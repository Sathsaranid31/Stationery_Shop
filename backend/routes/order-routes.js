import express from "express";
import { deleteOrder, getOrderById, newOrder } from "../controllers/order-controller";
 

const ordersRouter = express.Router();

ordersRouter.post("/",newOrder);
ordersRouter.get("/:id",getOrderById);
ordersRouter.delete("/:id",deleteOrder);

export default ordersRouter;
 
 
