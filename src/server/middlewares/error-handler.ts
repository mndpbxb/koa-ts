import { AppError } from "../../errors";
import { Context } from "koa";
import { Middleware } from "@koa/router";

const httpCodes: any = {
  10000: 500,
  20000: 404,
  30000: 400,
  30001: 400,
  30002: 401,
  30003: 403,
};

export const errorHandler = (): Middleware => {
  console.log("Error Handler message test");

  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      console.error(`Error Handler: ${err}`);

      if (err instanceof AppError) {
        ctx.body = err.toModel();
        ctx.status = httpCodes[err.code] ? httpCodes[err.code] : 500;
      } else {
        ctx.body = new AppError(10000, "Internal Error Server");
        ctx.status = 500;
      }
    }
  };
};
