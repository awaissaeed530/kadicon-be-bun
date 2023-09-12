import { Elysia } from "elysia";
import { initalizeDatabase } from "./database";
import { userRoutes } from "./modules";

await initalizeDatabase();

const app = new Elysia().use(userRoutes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
