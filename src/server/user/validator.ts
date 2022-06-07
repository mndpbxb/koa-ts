import Joi from "joi";

export const createUser: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
}).required();

export const updateUser: Joi.ObjectSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
}).required();

export const changePassword: Joi.ObjectSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
}).required();

export const login: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
}).required();

export const destroy: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
}).required();
