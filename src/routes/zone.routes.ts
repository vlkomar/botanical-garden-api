import express from "express";

import * as zoneController from "../controllers/zone.controller.js";
import { validate } from "../middlewares/validate.js";
import { createZoneSchema, updateZoneSchema } from "../schemas/zone.schema.js";

const router = express.Router();

router.post("/", validate(createZoneSchema), zoneController.createZone);

router.get("/", zoneController.getZones);

router.get("/:id", zoneController.getZoneById);

router.patch("/:id", validate(updateZoneSchema), zoneController.updateZone);

router.delete("/:id", zoneController.deleteZone);

export default router;
