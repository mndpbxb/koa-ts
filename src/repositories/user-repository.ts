import { User } from "../entities";
import { NotFoundError, ValidationError } from "../errors";
import { getConnection, getTransaction } from "../lib/database";
import { Hasher } from "../lib/hasher/index";

const TABLE = "user";

const findByEmail = async (email: string): Promise<User> => {
  const conn = await getConnection();
  const row = await conn.table(TABLE).where({ email }).first();
  if (!row) {
    throw new NotFoundError("User does not exist");
  }

  return transform(row);
};

const insert = async (user: User): Promise<User> => {
  user.created = new Date();
  user.updated = new Date();
  user.password = await Hasher.hashPassword(user.password);
  const conn = await getConnection();

  try {
    const result = await conn.table(TABLE).insert(
      {
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
        first_name: user.firstName,
        last_name: user.lastName,
        created: user.created,
        updated: user.updated,
      },
      "id"
    );

    user.id = result[0].id;

    return user;
  } catch (err: any) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new ValidationError(`Email ${user.email} already exists`, err);
    }

    throw err;
  }
};

const update = async (user: User): Promise<User> => {
  user.updated = new Date();

  const conn = await getConnection();

  await conn.table(TABLE).where({ id: user.id }).update({
    first_name: user.firstName,
    last_name: user.lastName,
    updated: user.updated,
  });

  return user;
};

const changePassword = async (
  email: string,
  newPassword: string
): Promise<void> => {
  const conn = await getConnection();

  await conn
    .table(TABLE)
    .update({
      password: newPassword,
      updated: new Date(),
    })
    .where("email", email);
};

const destroy = async (userId: number): Promise<void> => {
  const trx = await getTransaction();
  try {
    // await trx.from("task").delete().where({ user_id: userId });

    await trx.from(TABLE).update({ deleted: new Date() }).where({ id: userId });

    await trx.commit();
  } catch (error) {
    trx.rollback(error);
    throw error;
  }
};

const transform = (row: any): User => {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    password: row.password,
    role: row.role,
    firstName: row.first_name,
    lastName: row.last_name,
    created: row.created,
    updated: row.updated,
  };
};

export const UserRepository = {
  findByEmail,
  insert,
  update,
  changePassword,
  destroy,
};
