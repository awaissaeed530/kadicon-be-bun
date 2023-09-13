import { Elysia } from "elysia";
import { initalizeDatabase } from "./database";
import { reservationRoutes, scheduleRoutes, userRoutes } from "./modules";
import { cors } from "@elysiajs/cors";

await initalizeDatabase();

const app = new Elysia()
    .use(cors())
    .use(userRoutes)
    .use(scheduleRoutes)
    .use(reservationRoutes)
    .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
