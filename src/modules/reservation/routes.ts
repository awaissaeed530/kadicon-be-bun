import { lt, gt, and } from "drizzle-orm";
import { Elysia, InternalServerError} from "elysia";
import { dbContext } from "../../database";
import { ReservationSchema } from "../../database/schema";
import { CreateReservationRequest, InsertReservation, Reservation, ReservationState } from "./model";
import { areIntervalsOverlapping } from "date-fns";

export const reservationRoutes = new Elysia().group("/reservation", (app) =>
  app
    .post(
      "/",
      async ({ body, set }) => {
        if (body.noOfPersons < 1) {
            throw new InternalServerError();
        }

        const startDate = new Date(body.startDate);
        const endDate = new Date(body.endDate);

        const reservations = await getReservationsByDate(startDate)
        .then((_reservations) =>
            _reservations.filter((reservation) =>
                areIntervalsOverlapping(
                    { start: reservation.startDate, end: reservation.endDate },
                    { start: startDate, end: endDate },
                )
            )
        );

        const reservation: InsertReservation = {
            noOfPersons: body.noOfPersons,
            tableId: body.tableId as string,
            state: ReservationState.Unconfirmed,
            startDate,
            endDate,
            comment: body.comment,
            customerData: body.customerData,
        };

        let res = await dbContext.insert(ReservationSchema).values(reservation).returning();
        set.status = 201;
        return res.at(0);
      },
      { body: CreateReservationRequest }
    )
    .get("/", () => {
        return dbContext.select().from(ReservationSchema).limit(10);
    }));

async function getReservationsByDate(date: Date): Promise<Reservation[]> { 
    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

    let reservations = await dbContext.select().from(ReservationSchema)
    .where(
        and(
            lt(ReservationSchema.startDate, startDate),
            gt(ReservationSchema.startDate, endDate)
        )
    );
    return reservations;
}
