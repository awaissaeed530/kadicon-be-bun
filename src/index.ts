import { Elysia } from "elysia";
import { initalizeDatabase } from "./database";
import { scheduleRoutes, userRoutes } from "./modules";

await initalizeDatabase();

const app = new Elysia().use(userRoutes).use(scheduleRoutes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
