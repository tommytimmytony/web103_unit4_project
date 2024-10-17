import express from "express";
import CarsController from "../controllers/cars.js";

const router = express.Router();

router.get("/", CarsController.getCars);
router.post("/", CarsController.createCars);
router.get("/:carId", CarsController.getCarById);
router.delete("/:id", CarsController.deleteCar);
router.patch("/:id", CarsController.updateCar);

export default router;
