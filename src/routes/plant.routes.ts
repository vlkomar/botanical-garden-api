import express from "express";
import {
  createPlantSchema,
  updatePlantSchema,
} from "../schemas/plant.schema.js";
import { validate } from "../middlewares/validate.js";
import * as plantController from "../controllers/plant.controller.js";

const router = express.Router();

router.post("/", validate(createPlantSchema), plantController.createPlant);

router.get("/", plantController.getPlants);

router.get("/:id", plantController.getPlantById);

router.patch("/:id", validate(updatePlantSchema), plantController.updatePlant);

router.delete("/:id", plantController.deletePlant);

export default router;
