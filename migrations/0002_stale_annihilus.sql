CREATE TABLE IF NOT EXISTS "reservations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"noOfPersons" integer NOT NULL,
	"tableId" text NOT NULL,
	"state" text NOT NULL,
	"reminderSent" boolean DEFAULT false NOT NULL,
	"directCheckIn" boolean DEFAULT false NOT NULL,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp NOT NULL,
	"comment" text,
	"customerData" json NOT NULL
);
