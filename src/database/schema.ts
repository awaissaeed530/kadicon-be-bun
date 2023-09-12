import { json, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { SpecialDaysSchedule, WeeklySchedule } from "../modules";

export const UserSchema = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("firstName", { length: 256 }).notNull(),
  lastName: varchar("lastName", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
});

export const ScheduleSchema = pgTable("schedules", {
  id: uuid("id").primaryKey().defaultRandom(),
  weeklySchedule: json('weeklySchedule').$type<WeeklySchedule>().notNull(),
  specialDays: json('specialDays').$type<SpecialDaysSchedule>().notNull(),
});
