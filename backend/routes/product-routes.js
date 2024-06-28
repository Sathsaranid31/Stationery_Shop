import express from "express";
import { addProduct, getAllProducts, getProductById,deleteProductById, updateProductById } from "../controllers/product-controller";
 
const productRouter = express.Router();

productRouter.post("/",addProduct);
productRouter.get("/",getAllProducts);
productRouter.get("/:id",getProductById);
productRouter.delete("/:id",deleteProductById);
productRouter.put("/:id",updateProductById)
 
export default productRouter;