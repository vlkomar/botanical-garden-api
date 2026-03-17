import { Request, Response } from "express";
import { CreateZoneDTO, UpdateZoneDTO } from "../types/zone.types.js";
import * as zoneService from "../services/zone.service.js";

export async function createZone(req: Request, res: Response) {
  const zoneData: CreateZoneDTO = req.body;
  const createdZone = await zoneService.createZone(zoneData);

  return res.status(201).json({ success: true, data: createdZone });
}

export async function getZones(req: Request, res: Response) {
  const zones = await zoneService.getZones();
  return res.status(200).json({ success: true, data: zones });
}

export async function getZoneById(req: Request<{ id: string }>, res: Response) {
  const id = req.params.id;
  const zone = await zoneService.getZoneById(id);
  return res.status(200).json({ success: true, data: zone });
}

export async function updateZone(req: Request<{ id: string }>, res: Response) {
  const id = req.params.id;
  const zoneData: UpdateZoneDTO = req.body;

  const updatedZone = await zoneService.updateZone(id, zoneData);
  return res.status(200).json({ success: true, data: updatedZone });
}

export async function deleteZone(req: Request<{ id: string }>, res: Response) {
  const id = req.params.id;
  const deletedZone = await zoneService.deleteZone(id);

  return res.status(200).json({ success: true, data: deletedZone });
}
