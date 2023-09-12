import { eq } from "drizzle-orm";
import Elysia, { NotFoundError } from "elysia";
import { dbContext } from "../../database";
import { users } from "../../database/schema";
import { CreateUserRequest, CreateUserResponse } from "./model";

export const userRoutes = new Elysia().group("/user", (app) =>
  app
    .post(
      "/",
      async ({ body, set }) => {
        try {
          let res = await dbContext.insert(users).values(body).returning();
          set.status = 201;
          return res.at(0);
        } catch (e) {
          set.status = 400;
          return { message: "Bad Request" };
        }
      },
      {
        body: CreateUserRequest,
        response: { 201: CreateUserResponse },
      }
    )
    .get("/", () => {
      return dbContext.select().from(users).limit(10);
    })
    .get("/:id", async ({ params: { id }, set }) => {
      const res = await dbContext
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      if (!res.at(0)) {
        set.status = 404;
        throw new NotFoundError();
      }
      return res.at(0);
    })
);
