import express from "express";
import { adminOnly, authMiddleware } from "../middlewares/auth.middlewares.js";
import { addUser, deleteUser, editUser, getAllUsers, getMe, login } from "../controllers/auth.controllers.js";
const router = express.Router();
router.get("/register/users",authMiddleware,adminOnly,getAllUsers);
router.post("/register/create",authMiddleware,adminOnly,addUser);
router.put("/register/update",authMiddleware,adminOnly,editUser);
router.delete("/register/delete/:id",authMiddleware,adminOnly,deleteUser)
router.post("/login",login);
router.get("/getUser",authMiddleware,getMe)


export default router