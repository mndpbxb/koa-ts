import { Knex } from "knex";

export async function up(db: Knex) {
  await db.schema.createTable("attachment", (table) => {
    table.increments("id").primary();
    table.string("file_name", 255).notNullable();
    table.string("destination", 255).notNullable();
    table.string("owner_type", 100).notNullable();
    table.integer("owner_id").unsigned().notNullable();
    table.string("mime_type", 50).nullable();
    table.string("purpose", 255).notNullable();
    table.dateTime("created").notNullable();
    table.dateTime("deleted").nullable();
  });
}

export function down(db: Knex) {
  return db.schema.dropTable("attachment");
}
