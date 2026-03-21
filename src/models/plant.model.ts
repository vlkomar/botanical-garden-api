import pool from "../db.js";
import {
  CreatePlantDTO,
  Plant,
  UpdatePlantDTO,
} from "../schemas/plant.schema.js";
import { toCamelCase } from "../utils/case.helpers.js";
import { buildUpdateQuery } from "../utils/db.helpers.js";

export async function createPlant({
  acquisitionDate,
  scientificName,
  status,
  zoneId,
  commonName,
}: CreatePlantDTO) {
  const { rows } = await pool.query(
    `INSERT INTO plants 
		(acquisition_date, common_name, scientific_name, zone_id, status)
		VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [acquisitionDate, commonName, scientificName, zoneId, status],
  );

  return toCamelCase<Plant>(rows[0]);
}

export async function getPlants(zoneId?: string) {
  if (zoneId) {
    const { rows } = await pool.query(
      "SELECT * FROM plants WHERE zone_id = $1",
      [zoneId],
    );
    return rows.map((row) => toCamelCase<Plant>(row));
  }
  const { rows } = await pool.query("SELECT * FROM plants;");
  return rows.map((row) => toCamelCase<Plant>(row));
}

export async function getPlantById(id: string) {
  const { rows } = await pool.query("SELECT * FROM plants WHERE id = $1", [id]);
  return toCamelCase<Plant>(rows[0]);
}

export async function updatePlant(id: string, dto: UpdatePlantDTO) {
  const { query, values } = buildUpdateQuery("plants", dto, id);
  const { rows } = await pool.query(query, values);
  return toCamelCase<Plant>(rows[0]);
}

export async function deletePlant(id: string) {
  const { rows } = await pool.query(
    "DELETE FROM plants WHERE id = $1 RETURNING *;",
    [id],
  );
  return toCamelCase<Plant>(rows[0]);
}
