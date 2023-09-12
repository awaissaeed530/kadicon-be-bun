import type { Config } from "drizzle-kit";

if (!process.env.CONNECTION_STRING) {
  throw new Error('CONNECTION_STRING is missing');
} else {
  console.log("Using connection string ", process.env.CONNECTION_STRING)
}

export default {
  schema: "./src/database/schema.ts",
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.CONNECTION_STRING as string,
  },
  verbose: true,
} satisfies Config;