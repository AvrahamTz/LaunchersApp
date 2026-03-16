import express from "express";
import { addALauncher, deleteALauncher, getALauncher, getAllLaunchers } from "../controllers/launchers.controllers.js";
const router = express.Router();

router.get("/",getAllLaunchers);
router.get("/:id",getALauncher);
router.post("/",addALauncher);
router.delete("/:id",deleteALauncher);

export default router