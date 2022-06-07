import { Context } from "koa";

import { AttachmentRepository, UserRepository } from "../../repositories";
import { CreateUser, UserModel } from "./model";
import { User } from "../../entities/user";
import { Hasher } from "../../lib/hasher/index";
import { ValidationError } from "../../errors";
import { Authenticator } from "../../lib/authentication";
import { CreateAttachment } from "../../entities/attachment";

const get = async (ctx: Context) => {
  ctx.body = new UserModel(
    await UserRepository.findByEmail(ctx.state.user.email)
  );
  ctx.status = 200;
};

const create = async (ctx: Context) => {
  const userDto: CreateUser = ctx.request.body;
  const newUser = await UserRepository.insert(userDto as User);
  const attachment: CreateAttachment = {
    file: ctx.file,
    ownerId: <number>newUser.id,
    ownerType: "user",
    purpose: "profile",
  };

  newUser.profile = await AttachmentRepository.insert(attachment);

  ctx.body = new UserModel(newUser);
  ctx.status = 201;
  ctx.set("location", "/api/v1/users/me");
};

const login = async (ctx: Context) => {
  const user = await UserRepository.findByEmail(ctx.request.body.email);

  if (await Hasher.verifyPassword(ctx.request.body.password, user.password))
    return (ctx.body = { accessToken: Authenticator.authenticate(user) });

  throw new ValidationError("Wrong credentials");
};

const update = async (ctx: Context) => {
  const userDto = ctx.request.body;
  const user = await UserRepository.findByEmail(ctx.state.user.email);

  user.firstName = userDto.firstName;
  user.lastName = userDto.lastName;

  const updatedUser = await UserRepository.update(user);

  ctx.body = new UserModel(updatedUser);
  ctx.status = 200;
};

const changePassword = async (ctx: Context) => {
  const newPassword = ctx.request.body.newPassword;
  const oldPassword = ctx.request.body.oldPassword;

  const user = await UserRepository.findByEmail(ctx.state.user.email);

  const validPassword = await Hasher.verifyPassword(oldPassword, user.password);

  if (!validPassword) {
    throw new ValidationError("Old password is not correct");
  }
  const hashPassword = await Hasher.hashPassword(newPassword);

  await UserRepository.changePassword(user.email, hashPassword);
  ctx.status = 204;
};

const destroy = async (ctx: Context) => {
  await UserRepository.destroy(ctx.params.id);
  ctx.status = 204;
};

export { get, create, login, update, changePassword, destroy };
