import { MigrationBuilder } from "node-pg-migrate";
import type { ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`ALTER TABLE plants
			RENAME COLUMN acquisition_data TO acquisition_date;
		`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`ALTER TABLE plants
			RENAME COLUMN acquisition_date TO acquisition_data;
		`);
}
