import Router from "@koa/router";
import userRoutes from "./user";

const router = new Router({ prefix: "/api/v1.0" });

router.use("/users", userRoutes.routes());

export default router;
