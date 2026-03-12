import { MigrationBuilder } from "node-pg-migrate";
import type { ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
		CREATE TABLE plants (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			acquisition_data DATE DEFAULT CURRENT_DATE,
			common_name VARCHAR(150),
			scientific_name VARCHAR(150) NOT NULL,
			zone_id UUID REFERENCES zones(id) ON DELETE RESTRICT ,
			status VARCHAR(50) NOT NULL DEFAULT 'healthy',
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);
		`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql("DROP TABLE plants;");
}
