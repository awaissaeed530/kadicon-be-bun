import { t } from "elysia"
import { Static } from "@sinclair/typebox";
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { ReservationSchema } from "../../database/schema";

export type InsertReservation = InferInsertModel<typeof ReservationSchema>;
export type Reservation = InferSelectModel<typeof ReservationSchema>;

export interface CustomerData {
	name?: string
	email?: string
	phoneNumber?: string
}

export const CreateReservationRequest = t.Object({
    restaurantId: t.String(),
    tableId: t.Optional(t.String()),
    noOfPersons: t.Number(),
    startDate: t.String(),
    endDate: t.String(),
    comment: t.Optional(t.String()),
    customerData: t.Object({
        name: t.String(),
        phoneNumber: t.Optional(t.String()),
        email: t.Optional(t.String()),
    })
});
export type CreateReservationRequest = Static<typeof CreateReservationRequest>;

export enum ReservationState {
	Unconfirmed = 'unconfirmed',
	Approved = 'approved',
	Rejected = 'rejected',
	Seated = 'seated',
	Done = 'done',
}
