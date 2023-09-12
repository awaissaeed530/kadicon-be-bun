import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("firstName", { length: 256 }).notNull(),
  lastName: varchar("lastName", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
});
