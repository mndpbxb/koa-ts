import knex, { Knex } from "knex";
import path from "path";

interface Configuration {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  debug: boolean;
}

const connection: Configuration = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_TABLE || "koa_ts",
  debug: process.env.ENV == "Production" ? false : true,
};

const createConnection = (): Knex =>
  knex({
    client: "pg",
    version: "14.2",
    connection,
    debug: connection.debug,
    migrations: {
      tableName: "migrations",
    },
  });

const getConnection = async (): Promise<Knex> => createConnection();

const getTransaction = async (): Promise<Knex.Transaction> => {
  const connection = await getConnection();

  return new Promise<Knex.Transaction>((resolve, reject) => {
    try {
      connection.transaction((trx: Knex.Transaction) => {
        resolve(trx);
      });
    } catch (err) {
      reject(err);
    }
  });
};

// const closeDatabase = async(): Promise<void> => {
//     await this.connection.destroy()
// }

const schemaMigration = async () => {
  const connection = await getConnection();

  await connection.migrate.latest({
    directory: path.resolve(__dirname, "./migrations"),
  });
};

const schemaMigrationDown = async () => {
  const connection = await getConnection();

  await connection.migrate.down({
    directory: path.resolve(__dirname, "./migrations"),
  });
};

export { getConnection, getTransaction, schemaMigration, schemaMigrationDown };
