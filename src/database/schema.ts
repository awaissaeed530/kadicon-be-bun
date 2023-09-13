import { json, pgTable, uuid, varchar, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { CustomerData, SpecialDaysSchedule, WeeklySchedule } from "../modules";

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

export const ReservationSchema = pgTable("reservations", {
  id: uuid("id").primaryKey().defaultRandom(),
  noOfPersons: integer("noOfPersons").notNull(),
  tableId: text("tableId").notNull(),
  state: text("state").notNull(),
  reminderSent: boolean("reminderSent").default(false).notNull(),
  directCheckIn: boolean("directCheckIn").default(false).notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  comment: text("comment"),
  customerData: json("customerData").$type<CustomerData>().notNull(),
});
