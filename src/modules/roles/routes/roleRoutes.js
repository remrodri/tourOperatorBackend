import express from "express";
import RoleController from "../controllers/roleController.js";

const router = express.Router();

router.get("/roles", RoleController.getRoles);

export default router;
