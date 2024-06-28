import Orders from "../models/Orders";
import Product from "../models/Product";
import mongoose from "mongoose";
import User from "../models/User";

export const newOrder = async (req, res, next) => {
    const { product, price, user,name,address,contact,productname } = req.body;
  
  let existingProduct;
  let existingUser;
  try {
    existingProduct = await Product.findById(product);
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingProduct) {
    return res.status(404).json({ message: "Product Not Found With Given ID" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found with given ID " });
  }
     
    let order;
  
    try {
      order = new Orders({
        product,
        price,
        user,
        name,
        productname:existingProduct.name,
        address,
        contact

      });
      const session = await mongoose.startSession();
      session.startTransaction();
      existingUser.orders.push(order);
      existingProduct.orders.push(order);
      await existingUser.save({ session });
      await existingProduct.save({ session });
      await order.save({ session });
      session.commitTransaction();
    } catch (err) {
      return console.log(err);
    }
  
    if (!order) {
      return res.status(500).json({ message: "Unable to create an order" });
    }
  
    return res.status(201).json({ order });
  };

  export const getOrderById = async (req, res, next) => {
    const id = req.params.id;
    let order;
    try {
      order = await Orders.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!order) {
      return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(200).json({ order });
  };

  export const deleteOrder = async (req, res, next) => {
    const id = req.params.id;
    let order;
    try {
      order = await Orders.findByIdAndRemove(id).populate("user product");
      console.log(order);
      const session = await mongoose.startSession();
      session.startTransaction();
      await order.user.orders.pull(order);
      await order.product.orders.pull(order);
      await order.product.save({ session });
      await order.user.save({ session });
      session.commitTransaction();
    } catch (err) {
      return console.log(err);
    }
    if (!order) {
      return res.status(500).json({ message: "Unable to Delete" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
  };
  