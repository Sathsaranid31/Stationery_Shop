import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
   
  posterUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
