import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address:{
    type:String
  },
  contact:{
    type:String
  },
  name:{
    type:String
  },
  productname:{
    type:String
  }
  
});

export default mongoose.model("Order", orderSchema);