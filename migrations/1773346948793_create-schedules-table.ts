import { MigrationBuilder } from "node-pg-migrate";
import type { ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
		CREATE TABLE schedules (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			plant_id UUID REFERENCES plants(id) ON DELETE CASCADE,
			task_type_id UUID REFERENCES task_types(id) ON DELETE CASCADE,
			frequency_days INTEGER NOT NULL CHECK(frequency_days > 0),
			is_active BOOLEAN DEFAULT true,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			UNIQUE(plant_id, task_type_id)
		)
		`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql("DROP TABLE schedules;");
}
