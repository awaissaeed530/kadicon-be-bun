import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "./schema";

export let dbContext: NodePgDatabase<typeof schema>;

export async function initalizeDatabase(): Promise<void> {
  let connectionString = Bun.env.CONNECTION_STRING;
  if (!connectionString) {
    throw new Error("Please provide database connection string");
  }

  const pool = new Pool({ connectionString });
  dbContext = drizzle(pool, { schema, logger: true });
  await migrate(dbContext, { migrationsFolder: "migrations" });
}
