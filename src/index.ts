import Koa from "koa";
import env from "dotenv";
import router from "./server";
import { schemaMigration } from "./lib/database/index";
import { errorHandler } from "./server/middlewares/error-handler";

env.config();

const PORT = process.env.PORT || 8000;
const server = new Koa();

server.use(errorHandler());

schemaMigration();

server.use(router.routes());

server.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
