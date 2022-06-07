import { Knex } from "knex";

export async function up(db: Knex) {
  await db.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("first_name", 64).notNullable();
    table.string("last_name", 64).notNullable();
    table.string("username", 64).unique();
    table.string("email", 64).unique();
    table.string("password", 256).notNullable();
    table.enum("role", ["user", "admin"]).notNullable();
    table.dateTime("created").notNullable();
    table.dateTime("updated").notNullable();
    table.dateTime("deleted").nullable();
  });
}

export function down(db: Knex) {
  return db.schema.dropTable("user");
}
