import { Request, Response } from "express";
import { CreatePlantDTO, UpdatePlantDTO } from "../schemas/plant.schema.js";
import * as plantService from "../services/plant.service.js";

export async function createPlant(req: Request, res: Response) {
  const plantData: CreatePlantDTO = req.body;
  const createdPlant = await plantService.createPlant(plantData);

  return res.status(201).json({ success: true, data: createdPlant });
}

export async function getPlants(req: Request, res: Response) {
  const zoneId = req.query.zoneId as string | undefined;
  const plants = await plantService.getPlants(zoneId);
  return res.json({ success: true, data: plants });
}

export async function getPlantById(
  req: Request<{ id: string }>,
  res: Response,
) {
  const id = req.params.id;
  const plant = await plantService.getPlantById(id);
  return res.json({ success: true, data: plant });
}

export async function updatePlant(req: Request<{ id: string }>, res: Response) {
  const id = req.params.id;
  const plantData: UpdatePlantDTO = req.body;
  const updatedPlant = await plantService.updatePlant(id, plantData);
  return res.json({ success: true, data: updatedPlant });
}

export async function deletePlant(req: Request<{ id: string }>, res: Response) {
  const id = req.params.id;
  const deletedPlant = await plantService.deletePlant(id);
  return res.json({ success: true, data: deletedPlant });
}
