import { MigrationBuilder } from "node-pg-migrate";
import type { ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
		ALTER TABLE zones
		RENAME COLUMN target_humidity_ptc TO target_humidity_pct;
		`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
		ALTER TABLE zones
		RENAME COLUMN target_humidity_pct TO target_humidity_ptc;
		`);
}
