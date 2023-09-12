CREATE TABLE IF NOT EXISTS "schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"weeklySchedule" json NOT NULL,
	"specialDays" json NOT NULL
);
