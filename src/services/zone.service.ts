import * as zoneModel from "../models/zone.model.js";
import { CreateZoneDTO, UpdateZoneDTO } from "../schemas/zone.schema.js";
import { AppError } from "../utils/AppError.js";

export async function ensureZoneExists(id: string) {
  const zone = await zoneModel.getZoneById(id);
  if (!zone) throw new AppError(`Zone with id '${id}' not found`, 404);
  return zone;
}

export async function createZone(dto: CreateZoneDTO) {
  const existingZone = await zoneModel.getZoneByName(dto.name);
  if (existingZone)
    throw new AppError(`Zone with name '${dto.name}' already exists`, 409);

  const newZone = await zoneModel.createZone(dto);
  return newZone;
}

export async function getZones() {
  return await zoneModel.getZones();
}

export async function getZoneById(id: string) {
  return ensureZoneExists(id);
}

export async function updateZone(id: string, dto: UpdateZoneDTO) {
  await ensureZoneExists(id);

  return await zoneModel.updateZone(id, dto);
}

export async function deleteZone(id: string) {
  await ensureZoneExists(id);

  return await zoneModel.deleteZone(id);
}
