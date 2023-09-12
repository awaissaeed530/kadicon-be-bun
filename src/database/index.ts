import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export function initalizeDatabase(): NodePgDatabase<typeof schema> {
  let connectionString = Bun.env.CONNECTION_STRING;
  if (!connectionString) {
    throw new Error("Please provide database connection string");
  }

  const pool = new Pool({ connectionString });
  return drizzle(pool, { schema, logger: true });
}
