import { toSnakeCase } from "./case.helpers.js";

export function buildUpdateQuery(
  table: string,
  dto: Record<string, any>,
  id: string,
) {
  const dtoSnakeCase = toSnakeCase(dto) as Record<string, any>;
  const setClauses: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;
  for (const [key, value] of Object.entries(dtoSnakeCase)) {
    if (value != undefined && key) {
      setClauses.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  }

  if (setClauses.length === 0) {
    throw new Error("No fields to update have been specified");
  }

  values.push(id);

  const query = `
    UPDATE ${table} 
    SET ${setClauses.join(", ")} 
    WHERE id = $${paramIndex} 
    RETURNING *;
  `;

  return { query, values };
}
