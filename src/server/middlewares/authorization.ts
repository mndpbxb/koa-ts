import { Middleware } from "@koa/router";
import { PermissionError } from "../../errors";
import { AuthUser, Role } from "../../lib/authentication";
import { Context } from "koa";

export const authorization = (roles: Role[]): Middleware => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const user: AuthUser = ctx.state.user;

    if (roles.indexOf(user.role) < 0) {
      throw new PermissionError();
    }

    await next();
  };
};
