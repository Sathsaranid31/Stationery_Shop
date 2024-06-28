import express from "express";
import { deleteUser, getAllUsers, getOrdersOfUser, getUsersById, login, signup, updateUser } from "../controllers/user-controller";

const userRouter = express.Router();


userRouter.get("/", getAllUsers);
userRouter.get("/:id",getUsersById);
userRouter.post("/signup",signup);
userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteUser);
userRouter.post("/login",login);
userRouter.get("/orders/:id",getOrdersOfUser);

export default userRouter;