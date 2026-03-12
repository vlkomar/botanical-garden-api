import { MigrationBuilder } from "node-pg-migrate";
import type { ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
		CREATE TABLE task_types (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			name VARCHAR(100) NOT NULL UNIQUE,
			description TEXT
		);
		`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql("DROP TABLE task_types;");
}
