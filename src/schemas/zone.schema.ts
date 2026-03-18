import z from "zod";

const zoneSchema = z.object({
  id: z.uuid(),
  name: z.string().min(2),
  climateType: z.string(),
  targetTempC: z.number().optional(),
  targetHumidityPсt: z.number().min(0).max(100).optional(),
  createdAt: z.iso.datetime(),
});

export type Zone = z.infer<typeof zoneSchema>;

export const createZoneSchema = zoneSchema.omit({
  id: true,
  createdAt: true,
});

export type createZoneDTO = z.infer<typeof createZoneSchema>;

export const updateZoneSchema = createZoneSchema.partial();

export type updateZoneDTO = z.infer<typeof updateZoneSchema>;
