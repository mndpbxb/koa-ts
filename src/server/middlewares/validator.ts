import Joi from "joi";
import { Context } from "koa";
import { Middleware } from "@koa/router";
import { FieldValidationError } from "../../errors";

// export interface ObjectSchema {
//   params?: { [key: string]: Joi.ObjectSchema };

//   request?: {
//     body?: { [key: string]: Joi.ObjectSchema } | Joi.ArraySchema;
//     headers?: { [key: string]: Joi.ObjectSchema };
//   };

//   response?: {
//     body?: { [key: string]: Joi.ObjectSchema } | Joi.ArraySchema;
//     headers?: { [key: string]: Joi.ObjectSchema };
//   };
// }

const validateBody = (schema: Joi.ObjectSchema): Middleware => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { error } = schema.validate(ctx.request.body, {
      allowUnknown: true,
      abortEarly: false,
    });
    if (error) {
      throw new FieldValidationError(
        error.message,
        error.details.map((f: { message: any; path: any; type: any }) => ({
          message: f.message,
          path: f.path,
          type: f.type,
        })),
        error
      );
    }

    await next();
  };
};
const validateHeader = (schema: Joi.ObjectSchema): Middleware => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { error } = schema.validate(ctx.request.headers, {
      allowUnknown: true,
      abortEarly: false,
    });
    if (error) {
      throw new FieldValidationError(
        error.message,
        error.details.map((f: { message: any; path: any; type: any }) => ({
          message: f.message,
          path: f.path,
          type: f.type,
        })),
        error
      );
    }

    await next();
  };
};
const validateQuery = (schema: Joi.ObjectSchema): Middleware => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { error } = schema.validate(ctx.params, {
      allowUnknown: true,
      abortEarly: false,
    });

    if (error) {
      throw new FieldValidationError(
        error.message,
        error.details.map((f: { message: any; path: any; type: any }) => ({
          message: f.message,
          path: f.path,
          type: f.type,
        })),
        error
      );
    }

    await next();
  };
};

export const validator = {
  validateHeader,
  validateBody,
  validateQuery,
};
