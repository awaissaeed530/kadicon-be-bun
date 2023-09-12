import { Static } from "@sinclair/typebox";
import { t } from "elysia";

export const CreateUserRequest = t.Object({
  firstName: t.String({ minLength: 2, maxLength: 15 }),
  lastName: t.String({ minLength: 2, maxLength: 15 }),
  email: t.String({ format: "email" }),
});
export type CreateUserRequest = Static<typeof CreateUserRequest>;

export const CreateUserResponse = t.Object({
  id: t.String(),
  firstName: t.String(),
  lastName: t.String(),
  email: t.String(),
});
export type CreateUserResponse = Static<typeof CreateUserResponse>;
