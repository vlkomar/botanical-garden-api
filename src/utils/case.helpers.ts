export function toCamelCase<T>(obj: Record<string, any>): T | null {
  if (obj === undefined) return null;

  const replaced: Record<string, any> = {};

  for (let key in obj) {
    const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
      $1.toUpperCase().replace("_", ""),
    );
    replaced[camelCase] = obj[key];
  }

  return replaced as T;
}

export function toSnakeCase<T>(obj: Record<string, any>): T | null {
  if (obj === undefined) return null;

  const replaced: Record<string, any> = {};

  for (let key in obj) {
    const snakeCase = key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
    replaced[snakeCase] = obj[key];
  }

  return replaced as T;
}
