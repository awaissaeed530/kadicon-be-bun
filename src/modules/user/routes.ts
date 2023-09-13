import { eq } from "drizzle-orm";
import Elysia, { NotFoundError, t } from "elysia";
import { dbContext } from "../../database";
import { UserSchema } from "../../database/schema";
import { CreateUserRequest, CreateUserResponse } from "./model";

export const userRoutes = new Elysia().group("/user", (app) =>
  app
    .post(
      "/",
      async ({ body, set }) => {
        try {
          let res = await dbContext.insert(UserSchema).values(body).returning();
          set.status = 201;
          return res.at(0);
        } catch (e) {
          set.status = 400;
          return { message: "Bad Request" };
        }
      },
      {
        body: CreateUserRequest,
        response: {
          201: CreateUserResponse,
          400: t.Object({ message: t.String() }),
        },
      }
    )
    .get("/", () => {
      return dbContext.select().from(UserSchema).limit(10);
    })
    .get("/:id", async ({ params: { id } }) => {
      const res = await dbContext
        .select()
        .from(UserSchema)
        .where(eq(UserSchema.id, id))
        .limit(1);

      if (!res.at(0)) {
        throw new NotFoundError();
      }
      return res.at(0);
    })
);
