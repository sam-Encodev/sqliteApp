import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("users", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email"),
  createdAt: int("created_at"),
  updatedAt: int("updated_at"),
});
