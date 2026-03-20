import type {
  CreatePlantDTO,
  UpdatePlantDTO,
} from "../schemas/plant.schema.js";
import * as plantModel from "../models/plant.model.js";
import * as zoneService from "./zone.service.js";
import { AppError } from "../utils/AppError.js";

async function ensurePlantExists(id: string) {
  const plant = await plantModel.getPlantById(id);
  if (!plant) throw new AppError(`Plant with id '${id}' not found`, 404);
  return plant;
}

export async function createPlant(dto: CreatePlantDTO) {
  await zoneService.ensureZoneExists(dto.zoneId);

  const newPlant = await plantModel.createPlant(dto);
  return newPlant;
}

export async function getPlants(zoneId?: string) {
  if (!zoneId) return await plantModel.getPlants();

  await zoneService.ensureZoneExists(zoneId);
  return await plantModel.getPlants(zoneId);
}

export async function getPlantById(id: string) {
  return await ensurePlantExists(id);
}

export async function updatePlant(id: string, dto: UpdatePlantDTO) {
  await ensurePlantExists(id);
  if (dto.zoneId) await zoneService.ensureZoneExists(dto.zoneId);
  return await plantModel.updatePlant(id, dto);
}

export async function deletePlant(id: string) {
  await ensurePlantExists(id);
  return await plantModel.deletePlant(id);
}
