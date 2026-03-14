import pool from "../db.js";
import { CreateZoneDTO, UpdateZoneDTO, Zone } from "../types/zone.types.js";
import { toCamelCase } from "../utils/case.helpers.js";
import { buildUpdateQuery } from "../utils/db.helpers.js";

export async function createZone({
  name,
  climateType,
  targetTempC,
  targetHumidityPсt,
}: CreateZoneDTO) {
  const { rows } = await pool.query(
    `INSERT INTO zones 
		(name, climate_type, target_temp_c, target_humidity_pct)
		VALUES ($1, $2, $3, $4)
		RETURNING *;`,
    [name, climateType, targetTempC, targetHumidityPсt],
  );
  return toCamelCase<Zone>(rows[0]);
}

export async function getZones() {
  const { rows } = await pool.query("SELECT * FROM zones;");
  return rows.map((row) => toCamelCase<Zone>(row));
}

export async function getZoneById(id: string) {
  const { rows } = await pool.query("SELECT * FROM zones WHERE id = $1;", [id]);
  return toCamelCase<Zone>(rows[0]);
}

export async function updateZone(id: string, dto: UpdateZoneDTO) {
  const { query, values } = buildUpdateQuery("zones", dto, id);
  const { rows } = await pool.query(query, values);
  return toCamelCase<Zone>(rows[0]);
}

export async function deleteZone(id: string) {
  const { rows } = await pool.query(
    "DELETE FROM zones WHERE id = $1 RETURNING *;",
    [id],
  );
  return toCamelCase<Zone>(rows[0]);
}
