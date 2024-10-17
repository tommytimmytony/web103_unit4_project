import express from "express";
import CustomControllers from "../controllers/customs.js"

const router = express.Router();

router.get("/", CustomControllers.getCustoms);
router.get("/:customId", CustomControllers.getCustomsByBoltId);

export default router;
