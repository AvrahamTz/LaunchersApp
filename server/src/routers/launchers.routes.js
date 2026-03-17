import express from "express";
import { addALauncher, deleteALauncher, getALauncher, getAllLaunchers } from "../controllers/launchers.controllers.js";
import { authMiddleware, doubleAcsses } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.get("/",authMiddleware,getAllLaunchers);
router.get("/:id",authMiddleware,doubleAcsses,getALauncher);
router.post("/",authMiddleware,doubleAcsses,addALauncher);
router.delete("/:id",authMiddleware,doubleAcsses,deleteALauncher);

export default router