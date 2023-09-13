import Elysia, { t } from "elysia";
import { dbContext } from "../../database";
import { ScheduleSchema } from "../../database/schema";
import {
  CreateScheduleRequest,
  CreateScheduleResponse,
  TimeSlot,
  getDaySchedule,
} from "./model";
import { addMinutes, isBefore, isEqual } from "date-fns";

export const scheduleRoutes = new Elysia().group("/schedule", (app) =>
  app
    .post(
      "/",
      ({ body, set }) => {
        return dbContext
          .insert(ScheduleSchema)
          .values({
            weeklySchedule: body.weeklySchedule,
            specialDays: body.specialDays,
          })
          .returning();
      },
      {
        body: CreateScheduleRequest,
        response: { 201: CreateScheduleResponse },
      }
    )
    .get("/", () => {
      return dbContext.select().from(ScheduleSchema).limit(10);
    })
    .post("slots", ({ body }) => {
      return getTimeSlotsByDate(new Date(body.date));
    }, {
        body: t.Object({ date: t.String(), restaurantId: t.String() })
    })
);

async function getTimeSlotsByDate(date: Date): Promise<TimeSlot[]> {
  const schedule = await dbContext
    .select()
    .from(ScheduleSchema)
    .limit(1)
    .then((res) => res.at(0));
  const daySchedule = getDaySchedule(date, schedule);
  if (daySchedule.closed) return [];

  const timeSlots: TimeSlot[] = [];
  for (const rule of daySchedule.rules) {
    // prettier-ignore
    let startingTime = new Date(0, 0, 0, rule.openingTime.hours, rule.openingTime.minutes);
    // prettier-ignore
    const endingTime = new Date(0, 0, 0, rule.closingTime.hours, rule.closingTime.minutes);

    while (
      isEqual(startingTime, endingTime) ||
      isBefore(startingTime, endingTime)
    ) {
      timeSlots.push({
        available: true,
        time: {
          hours: startingTime.getHours(),
          minutes: startingTime.getMinutes(),
        },
      });

      startingTime = addMinutes(startingTime, 30);
    }
  }

  return timeSlots;
}
