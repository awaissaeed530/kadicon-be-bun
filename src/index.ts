import { Elysia } from "elysia";
import { initalizeDatabase } from "./database";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { users } from "./database/schema";

const database = initalizeDatabase();
await migrate(database, { migrationsFolder: "./../migrations" });

const app = new Elysia()
  .get("/", () => {
    let user = database.insert(users).values({
      firstName: "Awais",
      lastName: "Saeed",
      email: "awais@mail.com",
    }).returning();
    return user;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
