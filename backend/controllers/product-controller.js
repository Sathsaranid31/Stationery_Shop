import jwt from "jsonwebtoken";
import Product from "../models/Product";
import mongoose from "mongoose";
import Admin from "../models/Admin";

 
export const addProduct = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }

  let adminId;

  // verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new product
  const { name, price, posterUrl, featured  } =
    req.body;
  if (
    !name &&
    name.trim() === "" &&
    !price &&
    price.trim() == "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let product;
  try {
    product = new Product({
      name,
      featured,
      admin: adminId,
      posterUrl,
      price,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await product.save({ session });
    adminUser.addedProducts.push(product);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!product) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ product });
};

export const getAllProducts = async (req, res, next) => {
    let products;
  
    try {
      products = await Product.find();
    } catch (err) {
      return console.log(err);
    }
  
    if (!products) {
      return res.status(500).json({ message: "Request Failed" });
    }
    return res.status(200).json({ products });
  };

  export const getProductById = async (req, res, next) => {
    const id = req.params.id;
    let product;
    try {
      product = await Product.findById(id);
    } catch (err) {
      return console.log(err);
    }
  
    if (!product) {
      return res.status(404).json({ message: "Invalid Product ID" });
    }
  
    return res.status(200).json({ product });
  };


  export const deleteProductById = async (req,res,next) => {
    const id = req.params.id;
    let product;
    try {
      product = await Product.findByIdAndDelete(id);
    } catch (err) {
      return console.log(err);
    }
  
    if (!product) {
      return res.status(404).json({ message: "Invalid Product ID" });
    }
  
    return res.status(200).json({ product });

  }


  export const updateProductById = async (req,res,next) => {
    const id = req.params.id;
    let product;
    try {
      product = await Product.findByIdAndUpdate(id,req.body);
    } catch (err) {
      return console.log(err);
    }
  
    if (!product) {
      return res.status(404).json({ message: "Invalid Product ID" });
    }
  
    return res.status(200).json({ product });

  }