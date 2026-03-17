import express from "express";

import * as zoneController from "../controllers/zone.controller.js";

const router = express.Router();

router.post("/", zoneController.createZone);

router.get("/", zoneController.getZones);

router.get("/:id", zoneController.getZoneById);

router.patch("/:id", zoneController.updateZone);

router.delete("/:id", zoneController.deleteZone);

export default router;
