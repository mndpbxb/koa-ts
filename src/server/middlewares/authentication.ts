import { Middleware } from "@koa/router";
import { Authenticator } from "../../lib/authentication";
import { Context } from "koa";

export const authentication = (): Middleware => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const token: any = ctx.headers.authorization;
    const user = await Authenticator.validate(token);

    ctx.state.user = user;
    await next();
  };
};
