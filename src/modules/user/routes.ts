import Elysia from "elysia";
import { users } from "../../database/schema";
import { dbContext } from "../../database";

export const userRoutes = new Elysia().group("/user", (app) =>
  app.get("/", () => {
    return dbContext.select().from(users).limit(10);
  })
);
