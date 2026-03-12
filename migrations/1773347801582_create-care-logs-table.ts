import { MigrationBuilder } from "node-pg-migrate";
import type { ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
		CREATE TABLE care_logs (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			plant_id UUID REFERENCES plants(id) ON DELETE CASCADE,
			task_type_id UUID REFERENCES task_types(id) ON DELETE RESTRICT,
			execution_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			notes TEXT
		)
		`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql("DROP TABLE care_logs;");
}
