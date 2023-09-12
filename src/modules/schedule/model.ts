import { t } from "elysia";
import { Static } from "@sinclair/typebox";

export interface RestaurantSchedule {
  weeklySchedule: WeeklySchedule;
  specialDays: SpecialDaysSchedule;
}

export type WeeklySchedule = {
  [p in WeekDay]: {
    closed: boolean;
  } & TimingRules;
};

export type SpecialDaysSchedule = Array<SpecialDay>;

export type SpecialDay = {
  date: Date;
  recurring: boolean;
  closed: boolean;
} & TimingRules;

export type TimingRules = {
  rules: Array<TimingRule>;
};

export interface TimingRule {
  openingTime: Time;
  closingTime: Time;
}

export enum WeekDay {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export interface Time {
  hours: number;
  minutes: number;
}

export function getDaySchedule(
  date: Date,
  schedule?: RestaurantSchedule
): { closed: boolean; rules: TimingRule[] } {
  if (schedule === undefined) {
    return {
      closed: false,
      rules: [
        {
          openingTime: { hours: 0, minutes: 0 },
          closingTime: { hours: 24, minutes: 0 },
        },
      ],
    };
  }

  const specialDay = schedule.specialDays.find(
    (day) =>
      new Date(day.date).getDate() === date.getDate() &&
      new Date(day.date).getMonth() === date.getMonth()
  );
  if (
    specialDay &&
    (specialDay.recurring ||
      new Date(specialDay.date).getFullYear() === date.getFullYear())
  ) {
    return {
      closed: specialDay.closed,
      rules: specialDay.rules,
    };
  }

  const currentDay = getWeekDay(date);
  return schedule.weeklySchedule[currentDay];
}

function getWeekDay(date: Date): WeekDay {
  return date.toLocaleDateString("en-Us", { weekday: "long" }) as WeekDay;
}

const RuleSchema = t.Object({
  closed: t.Boolean(),
  rules: t.Optional(
    t.Array(
      t.Object({
        openingTime: t.Object({ hours: t.Number(), minutes: t.Number() }),
        closingTime: t.Object({ hours: t.Number(), minutes: t.Number() }),
      })
    )
  ),
});

const WeeklyScheduleSchema = t.Object({
  [WeekDay.Monday]: RuleSchema,
  [WeekDay.Tuesday]: RuleSchema,
  [WeekDay.Wednesday]: RuleSchema,
  [WeekDay.Thursday]: RuleSchema,
  [WeekDay.Friday]: RuleSchema,
  [WeekDay.Saturday]: RuleSchema,
  [WeekDay.Sunday]: RuleSchema,
});

const SpecialDaysSchema = t.Array(
  t.Object({
    closed: t.Boolean(),
    recurring: t.Boolean(),
    rules: t.Optional(
      t.Array(
        t.Optional(
          t.Object({
            openingTime: t.Object({ hours: t.Number(), minutes: t.Number() }),
            closingTime: t.Object({ hours: t.Number(), minutes: t.Number() }),
          })
        )
      )
    ),
  })
);

export const CreateScheduleRequest = t.Object({
  weeklySchedule: WeeklyScheduleSchema,
  specialDays: SpecialDaysSchema,
});
export type CreateScheduleRequest = Static<typeof CreateScheduleRequest>;

export const CreateScheduleResponse = t.Object({
  id: t.String(),
  weeklySchedule: WeeklyScheduleSchema,
  specialDays: SpecialDaysSchema,
});
export type CreateScheduleResponse = Static<typeof CreateScheduleResponse>;

export const TimeSlot = t.Object({
  time: t.Object({ hours: t.Number(), minutes: t.Number() }),
  available: t.Boolean(),
});
export type TimeSlot = Static<typeof TimeSlot>;
