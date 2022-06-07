import { Context } from 'koa'
import { Middleware } from '@koa/router'

export function logRequest(): Middleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const start = Date.now()

    await next()

    const message = `[${ctx.status}] ${ctx.method} ${ctx.path}`
    const logData: any = {
      method: ctx.method,
      path: ctx.path,
      statusCode: ctx.status,
      timeMs: Date.now() - start
    }

    if (ctx.status >= 400) {
      console.error(message, logData, ctx.body)
    } else {
      console.info(message, logData)
    }
  }
}
