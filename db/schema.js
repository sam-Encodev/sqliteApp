import { sql } from "drizzle-orm";
import { integer, text, sqliteTable, real } from "drizzle-orm/sqlite-core";

export const category = sqliteTable("categories", {
 id: integer("id").primaryKey({ autoIncrement: true }),
 name: text("name").notNull(),
 type: text("type", { enum: ["Expense", "Income"] }).notNull(),
 createdAt: integer("created_at"),
 updatedAt: integer("updated_at"),
});

export const transaction = sqliteTable("transactions", {
 id: integer("id").primaryKey({ autoIncrement: true }),
 category_id: integer("category_id").notNull(),
 amount: real("amount").notNull(),
 date: text("date").notNull().default(sql`(current_date)`),
 description: text("description").notNull(),
 type: text("type", { enum: ["Expense", "Income"] }).notNull(),
 createdAt: integer("created_at").notNull().default(sql`(current_timestamp)`),
 updatedAt: integer("updated_at")
  .notNull()
  .$onUpdateFn(() => sql`(current_timestamp)`),
});
