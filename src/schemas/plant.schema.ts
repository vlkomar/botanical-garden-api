import z from "zod";

const plantSchema = z.object({
  id: z.uuid(),
  acquisitionDate: z.iso.date(),
  commonName: z.string().optional(),
  scientificName: z.string(),
  zoneId: z.uuid(),
  status: z.enum(["healthy", "sick", "quarantine"]).default("healthy"),
  createdAt: z.iso.datetime().pipe(z.coerce.date()),
});

export type Plant = z.infer<typeof plantSchema>;

export const createPlantSchema = plantSchema.omit({
  id: true,
  createdAt: true,
});

export type CreatePlantDTO = z.infer<typeof createPlantSchema>;

export const updatePlantSchema = createPlantSchema.partial();

export type UpdatePlantDTO = z.infer<typeof updatePlantSchema>;
